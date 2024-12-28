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
        try(Connection connection = dataSource.getConnection();
            PreparedStatement ps = connection.prepareStatement(query);
            ResultSet rs = ps.executeQuery()) {

            if (rs.next()) {
                status.setRole(rs.getString("DATABASE_ROLE"));
                status.setProtectionMode(rs.getString("PROTECTION_MODE"));
            }
        }catch(SQLException e){
            throw new RuntimeException("Impossible de récupérer les informations DataGuard",e);
        }
        query = "SELECT name,value FROM V$DATAGUARD_STATS where name = 'apply lag'";
        try(Connection connection = dataSource.getConnection();
            PreparedStatement ps = connection.prepareStatement(query);
            ResultSet rs = ps.executeQuery()) {

            if (rs.next()) {
                String transportLagString = rs.getString("VALUE");
                status.setTransportLag(transportLagString);

            }
        } catch (SQLException e) {
            throw new RuntimeException("Impossible de récupérer les informations DataGuard", e);
        }
        return status;
    }
}