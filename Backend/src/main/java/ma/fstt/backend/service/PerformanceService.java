package ma.fstt.backend.service;

import ma.fstt.backend.entities.AWRReport;
import ma.fstt.backend.entities.ASHReport;
import ma.fstt.backend.entities.ResourceUsage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
public class PerformanceService {

    @Autowired
    private DataSource dataSource;

    public List<AWRReport> getAWRReports() throws SQLException {
        List<AWRReport> awrReports = new ArrayList<>();
        String query = "SELECT a.snap_id,b.begin_interval_time,a.stat_name, a.value  "
                + "  FROM dba_hist_sys_time_model a, dba_hist_snapshot b "
                + "  where a.snap_id =b.snap_id and a.dbid =b.dbid and a.instance_number = b.instance_number "
                +" and a.stat_name in ('DB time','CPU time')";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {

            AWRReport awr = new AWRReport();
            while (rs.next()) {

                String statName = rs.getString("STAT_NAME");
                if(awr.getSnapId() == null || !awr.getSnapId().equals(rs.getLong("SNAP_ID"))) {
                    if(awr.getSnapId() != null) {
                        awrReports.add(awr);
                    }
                    awr = new AWRReport();
                    awr.setSnapId(rs.getLong("SNAP_ID"));
                    awr.setCaptureTime(rs.getTimestamp("BEGIN_INTERVAL_TIME"));
                }

                if(statName.equals("DB time")) {
                    awr.setDbTimeSeconds(rs.getDouble("VALUE"));
                }else if (statName.equals("CPU time")) {
                    awr.setCpuUsageSeconds(rs.getDouble("VALUE"));
                }

            }
            if(awr.getSnapId() != null) {
                awrReports.add(awr);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Impossible de récupérer les rapports AWR", e);
        }
        return awrReports;
    }


    public List<ASHReport> getASHReports() throws SQLException {
        List<ASHReport> ashReports = new ArrayList<>();
        String query = "SELECT SAMPLE_TIME,SQL_ID,EVENT,SESSION_STATE FROM V$ACTIVE_SESSION_HISTORY WHERE SAMPLE_TIME > SYSDATE - INTERVAL '1' HOUR";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                ASHReport ash = new ASHReport();
                ash.setSampleTime(rs.getTimestamp("SAMPLE_TIME"));
                ash.setSqlId(rs.getString("SQL_ID"));
                ash.setEvent(rs.getString("EVENT"));
                ash.setSessionState(rs.getString("SESSION_STATE"));
                ashReports.add(ash);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Impossible de récupérer les rapports ASH", e);
        }
        return ashReports;
    }

    @Scheduled(fixedRate = 1000)
    public  ResourceUsage getResourceUsage() throws SQLException {
        String query = "SELECT ss.value cpu,os.value as os_value,CURRENT_TIMESTAMP as now"
                + "    FROM v$sysstat ss , v$osstat os "
                + "   WHERE ss.name = 'CPU used by this session' and os.stat_name='BUSY_TIME'" ;
        ResourceUsage resourceUsage = new ResourceUsage();
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {

            if(rs.next()) {
                //calcul le pourcentage du cpu
                double cpu =  rs.getDouble("cpu");
                double os = rs.getDouble("os_value");
                double cpuUsage = (cpu/os)*100;
                resourceUsage.setCpuUsage(cpuUsage);
                resourceUsage.setTimestamp(rs.getTimestamp("now"));
            }
        }catch(Exception ex){
            throw new RuntimeException("Impossible de récupérer les statistiques de performance",ex);
        }
        return resourceUsage;
    }
}