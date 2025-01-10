package ma.fstt.backend.service;


import ma.fstt.backend.entities.SlowQuery;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
@Service
public class OptimizationService {
    private static final Logger log = LoggerFactory.getLogger(PerformanceService.class);
    @Autowired
    private DataSource dataSource;


    public List<SlowQuery> getSlowQueries() throws SQLException {
        List<SlowQuery> slowQueries = new ArrayList<>();
        String query = "SELECT sql_id,sql_fulltext,elapsed_time/1000000 as elapsed_seconds, last_active_time FROM V$SQL ORDER BY elapsed_time DESC FETCH FIRST 10 ROWS ONLY";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {
            while(rs.next()){
                SlowQuery slowQuery = new SlowQuery();
                slowQuery.setSqlId(rs.getString("sql_id"));
                slowQuery.setSqlText(rs.getString("sql_fulltext"));
                slowQuery.setElapsedSeconds(rs.getDouble("elapsed_seconds"));
                slowQuery.setLastActiveTime(rs.getTimestamp("last_active_time"));
                slowQueries.add(slowQuery);
            }
        }catch (SQLException e) {
            throw new RuntimeException("Impossible de récupérer les requêtes lentes",e);
        }
        return slowQueries;
    }
    public String runSQLTuningAdvisor(String sqlId) throws SQLException {
        String report = null;
        String query =  """
        DECLARE
            l_sql_tune_task_id VARCHAR2(100);
            l_sql_text CLOB;
            l_sql_id VARCHAR2(100);
            l_task_exists NUMBER;
            l_report_text CLOB;
        BEGIN
            -- Activer plus de débogage
            DBMS_OUTPUT.PUT_LINE('Début du script de tuning');
        
            -- Vérifier si la tâche existe
            SELECT COUNT(*) INTO l_task_exists
            FROM DBA_ADVISOR_TASKS
            WHERE TASK_NAME = 'TUNING_TASK_TEST3';  -- Utilisation d'un nouveau nom de tâche
        
            -- Supprimer la tâche si elle existe
            IF l_task_exists > 0 THEN
                DBMS_SQLTUNE.DROP_TUNING_TASK(task_name => 'TUNING_TASK_TEST3');  -- Utilisation d'un nouveau nom de tâche
                DBMS_OUTPUT.PUT_LINE('Ancienne tâche supprimée');
            END IF;
        
            -- Récupérer et vérifier le texte SQL
            BEGIN
               SELECT SQL_FULLTEXT, SQL_ID INTO l_sql_text, l_sql_id
              FROM V$SQL
               WHERE SQL_ID = ? -- Utilisation du nouveau SQL_ID
                AND ROWNUM = 1;
        
                DBMS_OUTPUT.PUT_LINE('SQL Text trouvé: ' || SUBSTR(l_sql_text, 1, 100) || '...');
        
                -- Création de la tâche de tuning avec le texte SQL directement
                l_sql_tune_task_id := DBMS_SQLTUNE.CREATE_TUNING_TASK(
                    sql_text => l_sql_text,
                    scope    => DBMS_SQLTUNE.SCOPE_COMPREHENSIVE,
                    time_limit => 60,
                    task_name  => 'TUNING_TASK_TEST3',  -- Utilisation d'un nouveau nom de tâche
                    description => 'Testing SQL Tuning Advisor'
               );
        
             DBMS_OUTPUT.PUT_LINE('Tâche créée avec ID: ' || l_sql_tune_task_id);
        
                -- Exécution de la tâche
                DBMS_SQLTUNE.EXECUTE_TUNING_TASK(task_name => 'TUNING_TASK_TEST3');  -- Utilisation d'un nouveau nom de tâche
                 DBMS_OUTPUT.PUT_LINE('Tâche exécutée');
        
                -- Attendre que la tâche soit terminée
               DBMS_LOCK.SLEEP(10);
        
              -- Vérifier le statut de la tâche
               FOR rec IN (
                  SELECT STATUS, RECOMMENDATION_COUNT
                    FROM DBA_ADVISOR_TASKS
                  WHERE TASK_NAME = 'TUNING_TASK_TEST3'  -- Utilisation d'un nouveau nom de tâche
                ) LOOP
                DBMS_OUTPUT.PUT_LINE('Statut de la tâche: ' || rec.STATUS);
                  DBMS_OUTPUT.PUT_LINE('Nombre de recommandations: ' || rec.RECOMMENDATION_COUNT);
                 END LOOP;
        
                 -- Accepter les recommandations s'il y en a
                IF l_sql_tune_task_id IS NOT NULL THEN
                     DBMS_SQLTUNE.ACCEPT_SQL_PROFILE(
                      task_name  => 'TUNING_TASK_TEST3',  -- Utilisation d'un nouveau nom de tâche
                        replace    => TRUE
                   );
                     DBMS_OUTPUT.PUT_LINE('Profil SQL accepté');
                END IF;
        
           EXCEPTION
                 WHEN NO_DATA_FOUND THEN
                    DBMS_OUTPUT.PUT_LINE('SQL_ID non trouvé dans V$SQL');
                WHEN OTHERS THEN
                    DBMS_OUTPUT.PUT_LINE('Erreur lors de la récupération du SQL: ' || SQLERRM);
            END;
        
           -- Récupération du rapport
           l_report_text := DBMS_SQLTUNE.REPORT_TUNING_TASK(task_name => 'TUNING_TASK_TEST3', type => 'TEXT');
            DBMS_OUTPUT.PUT_LINE('Rapport de Tuning : '|| l_report_text);
           --INSERT INTO temp_tuning_report (report) VALUES (l_report_text);
          :report := l_report_text;
         EXCEPTION
            WHEN OTHERS THEN
               DBMS_OUTPUT.PUT_LINE('Erreur générale: ' || SQLERRM);
         END;
        """;
        try (Connection connection = dataSource.getConnection();
             CallableStatement cs = connection.prepareCall(query)) {
            cs.setString(1, sqlId);
            cs.registerOutParameter(2, Types.CLOB);
            cs.execute();
            report = cs.getString(2);

        } catch (SQLException e) {
            log.error("Impossible de lancer le SQL Tuning Advisor", e);
            throw new RuntimeException("Impossible de lancer le SQL Tuning Advisor: " + e.getMessage(), e);
        }
        return report;
    }
    public void exampleRunTuning() {
        try {
            runSQLTuningAdvisor("a79dq50j95xuf");
            System.out.println("SQL Tuning Advisor executed successfully.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public void recalculateStatistics() throws SQLException {

        try(Connection connection = dataSource.getConnection();
            CallableStatement cs = connection.prepareCall("{call DBMS_STATS.GATHER_DATABASE_STATS}")) {
            cs.execute();
        }catch(Exception ex){
            throw new RuntimeException("Impossible de recalculer les statistiques",ex);
        }

    }
}