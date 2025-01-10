package ma.fstt.backend.entities;
import java.util.Date;
public class DataGuardStatus {
    private String role;           // PRIMARY, STANDBY
    private String protectionMode;  // MAX_PERFORMANCE, MAX_AVAILABILITY, MAX_PROTECTION
    private String transportLag;    // Message indiquant l'état de la synchro
    private Date lastApplyTime;    // Date de dernier apply
    private String applyLag;     // Delai du apply
    private String lastReceiveTime;
    private String redoTransportStatus;
    private Long   sequenceGap;

    public void setApplyLag(String applyLag) {
        this.applyLag = applyLag;
    }

    public void setLastReceiveTime(String lastReceiveTime) {
        this.lastReceiveTime = lastReceiveTime;
    }

    public void setRedoTransportStatus(String redoTransportStatus) {
        this.redoTransportStatus = redoTransportStatus;
    }

    public void setSequenceGap(Long sequenceGap) {
        this.sequenceGap = sequenceGap;
    }

    public String getApplyLag() {
        return applyLag;
    }

    public String getLastReceiveTime() {
        return lastReceiveTime;
    }

    public String getRedoTransportStatus() {
        return redoTransportStatus;
    }

    public Long getSequenceGap() {
        return sequenceGap;
    }

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
