package ma.fstt.backend.entities;

import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
public class ResourceUsage {
    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public double getCpuUsage() {
        return cpuUsage;
    }

    public void setCpuUsage(double cpuUsage) {
        this.cpuUsage = cpuUsage;
    }

    public double getMemoryUsage() {
        return memoryUsage;
    }

    public void setMemoryUsage(double memoryUsage) {
        this.memoryUsage = memoryUsage;
    }

    public double getIoWaitTime() {
        return ioWaitTime;
    }

    public void setIoWaitTime(double ioWaitTime) {
        this.ioWaitTime = ioWaitTime;
    }

    public double getPhysicalReadBytes() {
        return physicalReadBytes;
    }

    public void setPhysicalReadBytes(double physicalReadBytes) {
        this.physicalReadBytes = physicalReadBytes;
    }

    public double getPhysicalWriteBytes() {
        return physicalWriteBytes;
    }

    public void setPhysicalWriteBytes(double physicalWriteBytes) {
        this.physicalWriteBytes = physicalWriteBytes;
    }

    public long getMemoryTarget() {
        return memoryTarget;
    }

    public void setMemoryTarget(long memoryTarget) {
        this.memoryTarget = memoryTarget;
    }

    private Date timestamp;
    private double cpuUsage; // CPU en pourcentage
    private double memoryUsage; // Memoire en pourcentage
    private double ioWaitTime;  // IO Wait Time en  secondes
    private double physicalReadBytes; // en octets
    private double physicalWriteBytes; //en octets
    private long memoryTarget; //en octets

}