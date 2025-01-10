package ma.fstt.backend.entities;

import java.util.Date;

public class StatisticsJob {
    private String jobName;
    private String objectName; // Nom de la table ou du schéma
    private String schema; // Nom du schema
    private String jobAction;
    private Date startTime;
    private String repeatInterval; // Expression CRON pour la planification
    private boolean enabled;
    private String comment;

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getObjectName() {
        return objectName;
    }

    public void setObjectName(String objectName) {
        this.objectName = objectName;
    }

    public String getSchema() {
        return schema;
    }

    public void setSchema(String schema) {
        this.schema = schema;
    }

    public String getJobAction() {
        return jobAction;
    }

    public void setJobAction(String jobAction) {
        this.jobAction = jobAction;
    }

    public String getRepeatInterval() {
        return repeatInterval;
    }

    public void setRepeatInterval(String repeatInterval) {
        this.repeatInterval = repeatInterval;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public StatisticsJob() {
    }
    public StatisticsJob(String jobName, String objectName, String schema, String jobAction, Date startTime, String repeatInterval, boolean enabled, String comment) {
        this.jobName = jobName;
        this.objectName = objectName;
        this.schema = schema;
        this.jobAction = jobAction;
        this.startTime = startTime;
        this.repeatInterval = repeatInterval;
        this.enabled = enabled;
        this.comment = comment;
    }
}