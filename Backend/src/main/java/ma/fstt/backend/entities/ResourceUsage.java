package ma.fstt.backend.entities;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


public class ResourceUsage {
    private Date timestamp;
    private double cpuUsage;
    private double ioWaitTime;
    private double memoryUsage;

    public Date getTimestamp() {
        return timestamp;
    }

    public double getCpuUsage() {
        return cpuUsage;
    }
    public double getIoWaitTime() {
        return ioWaitTime;
    }
    public double getMemoryUsage() {
        return memoryUsage;
    }
    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
    public void setCpuUsage(double cpuUsage) {
        this.cpuUsage = cpuUsage;
    }
    public void setIoWaitTime(double ioWaitTime) {
        this.ioWaitTime = ioWaitTime;
    }
    public void setMemoryUsage(double memoryUsage) {
        this.memoryUsage = memoryUsage;
    }

}
