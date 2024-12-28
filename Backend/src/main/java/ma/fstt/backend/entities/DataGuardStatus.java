package ma.fstt.backend.entities;
import java.util.Date;
public class DataGuardStatus {
    private String role;           // PRIMARY, STANDBY
    private String protectionMode;  // MAX_PERFORMANCE, MAX_AVAILABILITY, MAX_PROTECTION
    private String transportLag;    // Lag en secondes
    private Date lastApplyTime;

    public String getProtectionMode() {
        return protectionMode;
    }
    public void setProtectionMode(String protectionMode) {
        this.protectionMode = protectionMode;
    }
    public String getTransportLag() {
        return transportLag;
    }
    public void setTransportLag(String transportLag) {
        this.transportLag = transportLag;
    }
    public Date getLastApplyTime() {
        return lastApplyTime;
    }
    public void setLastApplyTime(Date lastApplyTime) {
        this.lastApplyTime = lastApplyTime;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }

}
