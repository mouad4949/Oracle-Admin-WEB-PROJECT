package ma.fstt.backend.service;

import ma.fstt.backend.entities.ASHReport;
import ma.fstt.backend.entities.AWRReport;
import ma.fstt.backend.entities.ResourceUsage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class PerformanceService {

    private static final Logger log = LoggerFactory.getLogger(PerformanceService.class);

    @Autowired
    private DataSource dataSource;

    /**
     * Récupère les rapports AWR (Automatic Workload Repository) pour la base de données Oracle.
     *
     * @return Une liste d'objets AWRReport contenant les données.
     * @throws SQLException Si une erreur SQL se produit lors de l'exécution de la requête.
     */
    public List<AWRReport> getAWRReports() throws SQLException {
        List<AWRReport> awrReports = new ArrayList<>();
        String query = """
         SELECT
           b.snap_id,
           b.begin_interval_time,
           b.end_interval_time,
           (
               CASE
                   WHEN LAG(a.value, 1, 0) OVER (ORDER BY b.snap_id) = 0 THEN 0
                   ELSE
                       (a.value - LAG(a.value, 1, 0) OVER (ORDER BY b.snap_id)) /
                       (
                           EXTRACT(SECOND FROM (b.end_interval_time - b.begin_interval_time)) +
                           EXTRACT(MINUTE FROM (b.end_interval_time - b.begin_interval_time)) * 60 +
                           EXTRACT(HOUR FROM (b.end_interval_time - b.begin_interval_time)) * 3600
                       )
               END
           ) AS cpu_usage_seconds,
           b.instance_number
         FROM
           dba_hist_sys_time_model a
         JOIN
           dba_hist_snapshot b
         ON
           a.snap_id = b.snap_id
         WHERE
           a.stat_name = 'DB CPU'
         ORDER BY
           b.snap_id
     """;

        log.info("Exécution de la requête pour récupérer les rapports AWR...");
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                AWRReport awr = new AWRReport();
                awr.setSnapId(rs.getLong("snap_id"));
                awr.setCaptureTime(rs.getTimestamp("begin_interval_time"));
                awr.setCpuUsageSeconds(rs.getDouble("cpu_usage_seconds"));
                awr.setInstanceNumber(rs.getInt("instance_number"));
                awrReports.add(awr);
            }
            log.info("Requête exécutée avec succès. Nombre de rapports récupérés : {}", awrReports.size());
        } catch (SQLException e) {
            log.error("Impossible de récupérer les rapports AWR : {}", e.getMessage(), e);
            throw new RuntimeException("Erreur lors de l'exécution de la requête AWR.", e);
        }

        return awrReports;
    }

    /**
     * Récupère les rapports ASH (Active Session History) pour la base de données Oracle.
     *
     * @return Une liste d'objets ASHReport contenant les données.
     * @throws SQLException Si une erreur SQL se produit lors de l'exécution de la requête.
     */
    public List<ASHReport> getASHReports() throws SQLException {
        List<ASHReport> ashReports = new ArrayList<>();
        String query =
                """
                  SELECT SAMPLE_TIME,SQL_ID,EVENT,SESSION_STATE,session_id,session_serial#,time_waited,blocking_session,blocking_session_serial#
                      ,(select INST_ID from v$instance ) as instance_number
                      FROM gv$active_session_history WHERE SAMPLE_TIME > SYSDATE - INTERVAL '1' HOUR order by SAMPLE_TIME DESC
                """;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                ASHReport ash = new ASHReport();
                ash.setSampleTime(rs.getTimestamp("SAMPLE_TIME"));
                ash.setSqlId(rs.getString("SQL_ID"));
                ash.setEvent(rs.getString("EVENT"));
                ash.setSessionState(rs.getString("SESSION_STATE"));
                ash.setSessionId(rs.getLong("session_id"));
                ash.setSessionSerial(rs.getLong("session_serial#"));
                ash.setTimeWaited(rs.getLong("time_waited"));
                ash.setBlockingSession(rs.getLong("blocking_session"));
                ash.setBlockingSessionSerial(rs.getLong("blocking_session_serial#"));
                ash.setInstanceNumber(rs.getInt("instance_number"));
                ashReports.add(ash);
            }
        } catch (SQLException e) {
            log.error("Impossible de récupérer les rapports ASH", e);
            throw new RuntimeException("Impossible de récupérer les rapports ASH", e);
        }
        return ashReports;
    }
    /**
     * Récupère les informations d'utilisation des ressources de la base de données Oracle.
     *
     * @return Un objet ResourceUsage contenant les données.
     * @throws SQLException Si une erreur SQL se produit lors de l'exécution de la requête.
     */
    @Scheduled(fixedRate = 1000)
    public ResourceUsage getResourceUsage() throws SQLException {

        String query =  """
             SELECT
                 (SELECT value FROM v$sysstat WHERE name = 'CPU used by this session') as cpu,
                 (SELECT value FROM v$osstat WHERE stat_name = 'BUSY_TIME') as os_busy_time,
                 (SELECT value FROM v$parameter WHERE name = 'memory_target') as memory_target,
                 (SELECT SUM(bytes) FROM v$sgastat WHERE pool = 'shared pool' AND name = 'free memory') as free_memory,
                 (SELECT SUM(bytes) FROM v$sgastat WHERE pool = 'shared pool' AND name = 'used memory') as used_memory,
                 (SELECT value FROM v$sysstat WHERE name = 'physical read bytes') as physical_read_bytes,
                 (SELECT value FROM v$sysstat WHERE name = 'physical write bytes') as physical_write_bytes,
                 (SELECT value FROM v$sysstat WHERE name = 'user I/O wait time') as io_wait_time,
                 CURRENT_TIMESTAMP as now
             FROM dual
     """;
        ResourceUsage resourceUsage = new ResourceUsage();
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {
            if (rs.next()) {
                // Calculer le pourcentage du CPU
                double cpu = rs.getDouble("cpu");
                double os = rs.getDouble("os_busy_time");
                double cpuUsage = (cpu / os) * 100;
                resourceUsage.setCpuUsage(cpuUsage);

                // Calculer l'utilisation de la mémoire
                double usedMemory = rs.getDouble("used_memory");
                long memoryTarget = rs.getLong("memory_target");
                double memoryUsage = (memoryTarget > 0) ? (usedMemory / memoryTarget) * 100 : 0;
                resourceUsage.setMemoryUsage(memoryUsage);

                // Autres champs
                resourceUsage.setTimestamp(rs.getTimestamp("now"));
                resourceUsage.setPhysicalReadBytes(rs.getDouble("physical_read_bytes"));
                resourceUsage.setPhysicalWriteBytes(rs.getDouble("physical_write_bytes"));
                resourceUsage.setMemoryTarget(memoryTarget);

                // Attribuer la valeur de l'I/O wait time
                long ioWaitTime = rs.getLong("io_wait_time");
                resourceUsage.setIoWaitTime(ioWaitTime);
            }
        } catch (SQLException e) {
            log.error("Impossible de récupérer les statistiques de performance", e);
            throw new RuntimeException("Impossible de récupérer les statistiques de performance", e);
        }
        return resourceUsage;
    }

}