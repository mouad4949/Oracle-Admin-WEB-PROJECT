package ma.fstt.backend.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


public class AWRReport {
    private Date captureTime;
    private Double cpuUsageSeconds;
    private Double dbTimeSeconds;
    private Long snapId;

    public Date getCaptureTime() {
        return captureTime;
    }
    public void setCaptureTime(Date captureTime) {
        this.captureTime = captureTime;
    }

    public Double getCpuUsageSeconds() {
        return cpuUsageSeconds;
    }
    public void setCpuUsageSeconds(Double cpuUsageSeconds) {
        this.cpuUsageSeconds = cpuUsageSeconds;
    }
    public Double getDbTimeSeconds() {
        return dbTimeSeconds;
    }
    public void setDbTimeSeconds(Double dbTimeSeconds) {
        this.dbTimeSeconds = dbTimeSeconds;
    }
    public Long getSnapId() {
        return snapId;
    }
    public void setSnapId(Long snapId) {
        this.snapId = snapId;
    }

}