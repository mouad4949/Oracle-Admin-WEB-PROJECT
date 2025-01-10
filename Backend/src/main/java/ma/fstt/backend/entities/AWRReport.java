package ma.fstt.backend.entities;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AWRReport {
    public Long getSnapId() {
        return snapId;
    }

    public void setSnapId(Long snapId) {
        this.snapId = snapId;
    }

    public Double getCpuUsageSeconds() {
        return cpuUsageSeconds;
    }

    public void setCpuUsageSeconds(Double cpuUsageSeconds) {
        this.cpuUsageSeconds = cpuUsageSeconds;
    }

    public Date getCaptureTime() {
        return captureTime;
    }

    public void setCaptureTime(Date captureTime) {
        this.captureTime = captureTime;
    }

    public Double getDbTimeSeconds() {
        return dbTimeSeconds;
    }

    public void setDbTimeSeconds(Double dbTimeSeconds) {
        this.dbTimeSeconds = dbTimeSeconds;
    }

    public int getInstanceNumber() {
        return instanceNumber;
    }

    public void setInstanceNumber(int instanceNumber) {
        this.instanceNumber = instanceNumber;
    }

    private Long snapId;
    private Date captureTime;
    private Double cpuUsageSeconds; //CPU time en seconds
    private Double dbTimeSeconds; //DB time en seconds
    private int instanceNumber; // identifiant de l'instance Oracle.

}