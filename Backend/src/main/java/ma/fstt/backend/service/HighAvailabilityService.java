package ma.fstt.backend.service;

import ma.fstt.backend.entities.DataGuardStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

@Service
public class HighAvailabilityService {

    @Autowired
    private DataSource dataSource;

    public DataGuardStatus getDataGuardStatus() throws SQLException {
        String query = "SELECT DATABASE_ROLE,PROTECTION_MODE FROM V$DATABASE";
        DataGuardStatus status = new DataGuardStatus();
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {

            if (rs.next()) {
                status.setRole(rs.getString("DATABASE_ROLE"));
                status.setProtectionMode(rs.getString("PROTECTION_MODE"));
            }
        } catch (SQLException e) {
            throw new RuntimeException("Impossible de récupérer les informations DataGuard", e);
        }
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement("SELECT count(*) FROM V$DATAGUARD_CONFIG");
             ResultSet rs = ps.executeQuery()) {
            if (rs.next()) {
                int nb = rs.getInt(1);
                if (nb == 0) {
                    status.setTransportLag("DataGuard not configured (simulated)");
                } else {
                    query = "SELECT  VALUE from  V$DATAGUARD_STATS WHERE name ='apply lag'";
                    try (Connection connection2 = dataSource.getConnection();
                         PreparedStatement ps2 = connection2.prepareStatement(query);
                         ResultSet rs2 = ps2.executeQuery()) {
                        if (rs2.next()) {
                            String transportLagString = rs2.getString("VALUE");
                            status.setTransportLag(transportLagString);
                        }
                    }catch(SQLException e){
                        System.err.println("Impossible de récupérer l'apply lag:"+e.getMessage());
                    }
                }
            }
        }catch(SQLException e){
            System.err.println("Impossible de vérifier la configuration dataGuard : "+e.getMessage());
        }

        return status;
    }

    public void simulateFailover() throws SQLException {
        String query = "SELECT * from dual";
        try(Connection connection = dataSource.getConnection();
            PreparedStatement ps = connection.prepareStatement(query)) {
            ps.execute();
        }catch(Exception ex){
            throw new RuntimeException("Impossible de simuler le failover",ex);
        }
    }


    public void simulateFailback() throws SQLException {
        String query = "SELECT * from dual";
        try(Connection connection = dataSource.getConnection();
            PreparedStatement ps = connection.prepareStatement(query)) {
            ps.execute();
        }catch(Exception ex){
            throw new RuntimeException("Impossible de simuler le failback",ex);
        }
    }
}