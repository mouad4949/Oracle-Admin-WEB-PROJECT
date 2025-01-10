package ma.fstt.backend.entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "backups")
public class Backup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String inputType;

    private String backupType;

    private String incrementalLevel;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startTime;

    @Temporal(TemporalType.TIMESTAMP)
    private Date endTime;

    private String status;


    public Backup() {}

    public Backup(String inputType, String backupType, String incrementalLevel, Date startTime, Date endTime, String status) {
        this.inputType = inputType;
        this.backupType = backupType;
        this.incrementalLevel = incrementalLevel;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInputType() {
        return inputType;
    }

    public void setInputType(String inputType) {
        this.inputType = inputType;
    }

    public String getBackupType() {
        return backupType;
    }

    public void setBackupType(String backupType) {
        this.backupType = backupType;
    }

    public String getIncrementalLevel() {
        return incrementalLevel;
    }

    public void setIncrementalLevel(String incrementalLevel) {
        this.incrementalLevel = incrementalLevel;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
