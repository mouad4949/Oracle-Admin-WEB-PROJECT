package ma.fstt.backend.service;

import ma.fstt.backend.entities.StatisticsJob;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class StatisticsService {
    private static final Logger log = LoggerFactory.getLogger(StatisticsService.class);

    @Autowired
    private DataSource dataSource;

    public void scheduleTableStatsJob(StatisticsJob job) throws SQLException {
        String query = """
                DECLARE
                   l_job_name VARCHAR2(100) := ?;
                   l_repeat_interval VARCHAR2(100) := ?;
                  l_start_date TIMESTAMP := SYSTIMESTAMP;
                   l_schema_name  VARCHAR2(100) := ?;
                  l_table_name  VARCHAR2(100) := ?;
                BEGIN
                   -- Supprimer le job s'il existe déjà
                    BEGIN
                       DBMS_SCHEDULER.DROP_JOB(job_name => l_job_name);
                     EXCEPTION
                      WHEN OTHERS THEN
                        NULL;
                    END;
                  -- Créer un nouveau job
               DBMS_SCHEDULER.CREATE_JOB (
                       job_name        => l_job_name,
                       job_type        => 'PLSQL_BLOCK',
                        job_action      => 'BEGIN DBMS_STATS.GATHER_TABLE_STATS(ownname => ''' || l_schema_name || ''', tabname=> ''' || l_table_name || '''); END;',
                       start_date      => l_start_date,
                        repeat_interval => l_repeat_interval,
                        enabled         => TRUE,
                        comments        => 'Recalcul des statistiques de la table '|| l_table_name
                      );
                   DBMS_OUTPUT.PUT_LINE('Le job : '|| l_job_name || ' a bien été crée');
                END;
            """;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);) {

            ps.setString(1,job.getJobName());
            ps.setString(2,job.getRepeatInterval());
            ps.setString(3,job.getSchema());
            ps.setString(4,job.getObjectName());
            ps.execute();
            log.info("Le job : {} a bien été crée", job.getJobName());
        }catch (SQLException ex){
            log.error("Impossible de planifier le job {}", job.getJobName(), ex );
            throw new RuntimeException("Impossible de planifier le job ", ex);
        }
    }
    public void scheduleSchemaStatsJob(StatisticsJob job) throws SQLException {
        String query = """
                DECLARE
                  l_job_name VARCHAR2(100) := ?;
                   l_repeat_interval VARCHAR2(100) := ?;
                   l_start_date TIMESTAMP := SYSTIMESTAMP;
                  l_schema_name  VARCHAR2(100) := ?;
               BEGIN
                   -- Supprimer le job s'il existe déjà
                  BEGIN
                     DBMS_SCHEDULER.DROP_JOB(job_name => l_job_name);
                     EXCEPTION
                      WHEN OTHERS THEN
                       NULL;
                    END;
                   -- Créer un nouveau job
                   DBMS_SCHEDULER.CREATE_JOB (
                        job_name        => l_job_name,
                       job_type        => 'PLSQL_BLOCK',
                        job_action      => 'BEGIN DBMS_STATS.GATHER_SCHEMA_STATS(ownname => ''' || l_schema_name || '''); END;',
                        start_date      => l_start_date,
                        repeat_interval => l_repeat_interval,
                        enabled         => TRUE,
                        comments        => 'Recalcul des statistiques du schéma ' || l_schema_name
                   );
                  DBMS_OUTPUT.PUT_LINE('Le job : '|| l_job_name || ' a bien été crée');
               END;
            """;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);) {
            ps.setString(1,job.getJobName());
            ps.setString(2,job.getRepeatInterval());
            ps.setString(3,job.getObjectName());
            ps.execute();
            log.info("Le job : {} a bien été crée", job.getJobName());
        }catch (SQLException ex){
            log.error("Impossible de planifier le job {}", job.getJobName(), ex );
            throw new RuntimeException("Impossible de planifier le job ", ex);
        }
    }

    public void scheduleDatabaseStatsJob(StatisticsJob job) throws SQLException {
        String query = """
                DECLARE
                     l_job_name VARCHAR2(100) := ?;
                      l_repeat_interval VARCHAR2(100) := ?;
                     l_start_date TIMESTAMP := SYSTIMESTAMP;
                   BEGIN
                       -- Supprimer le job s'il existe déjà
                      BEGIN
                          DBMS_SCHEDULER.DROP_JOB(job_name => l_job_name);
                          EXCEPTION
                           WHEN OTHERS THEN
                            NULL;
                        END;
                      -- Créer un nouveau job
                        DBMS_SCHEDULER.CREATE_JOB (
                            job_name        => l_job_name,
                           job_type        => 'PLSQL_BLOCK',
                            job_action      => 'BEGIN DBMS_STATS.GATHER_DATABASE_STATS; END;',
                           start_date      => l_start_date,
                            repeat_interval => l_repeat_interval,
                             enabled         => TRUE,
                             comments        => 'Recalcul des statistiques de la base de données'
                        );
                        DBMS_OUTPUT.PUT_LINE('Le job : '|| l_job_name || ' a bien été crée');
                    END;
            """;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);) {
            ps.setString(1,job.getJobName());
            ps.setString(2,job.getRepeatInterval());
            ps.execute();
            log.info("Le job : {} a bien été crée", job.getJobName());
        }catch (SQLException ex){
            log.error("Impossible de planifier le job {}", job.getJobName(), ex );
            throw new RuntimeException("Impossible de planifier le job ", ex);
        }
    }
    public List<StatisticsJob> listScheduledJobs() throws SQLException {
        List<StatisticsJob> jobs = new ArrayList<>();
        String query = "SELECT job_name, job_action, start_date, repeat_interval, enabled FROM   dba_scheduler_jobs";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                StatisticsJob job = new StatisticsJob();
                job.setJobName(rs.getString("job_name"));
                job.setJobAction(rs.getString("job_action"));
                job.setStartTime(rs.getTimestamp("start_date"));
                job.setRepeatInterval(rs.getString("repeat_interval"));
                job.setEnabled(rs.getBoolean("enabled"));
                jobs.add(job);
            }
        }catch (SQLException ex){
            log.error("Impossible de récupérer les jobs planifiés", ex);
            throw new RuntimeException("Impossible de récupérer les jobs planifiés", ex);
        }
        return jobs;
    }
    public void removeScheduledJob(String jobName) throws SQLException {

        String query = """
            BEGIN
              DBMS_SCHEDULER.DROP_JOB(job_name => ?);
            END;
        """;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);) {
            ps.setString(1,jobName);
            ps.execute();
            log.info("Le job : {} a bien été supprimé", jobName);
        }catch (SQLException ex){
            log.error("Impossible de supprimer le job {}", jobName, ex );
            throw new RuntimeException("Impossible de supprimer le job ", ex);
        }
    }
}