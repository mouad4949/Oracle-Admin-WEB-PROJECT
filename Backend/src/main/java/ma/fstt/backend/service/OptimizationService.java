package ma.fstt.backend.service;


import ma.fstt.backend.entities.SlowQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class OptimizationService {

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
    public void runSQLTuningAdvisor(String sqlId) throws SQLException {
        CallableStatement cs = null;
        try(Connection connection = dataSource.getConnection();
        ) {
            cs = connection.prepareCall("BEGIN DBMS_SQLTUNE.CREATE_SQL_PROFILE(sql_id => ? ,profile_name => 'profile_'||? , attribute_name => 'force_match' , attribute_value => 'TRUE',description=>'created by the application',user_name => 'MOUAD' ); END;");
            cs.setString(1, sqlId);
            cs.setString(2, sqlId);
            cs.execute();

        }catch (SQLException e) {
            System.err.println("Error SQL: " + e.getMessage());
            throw new RuntimeException("Impossible de lancer le SQL Tuning Advisor: "+e.getMessage(), e);
        }finally {
            if (cs != null) {
                cs.close();
            }
        }
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