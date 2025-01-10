package ma.fstt.backend.entities;

import java.util.Date;

public class SlowQuery {
    private String sqlId;
    private String sqlText;
    private double elapsedSeconds;
    private Date lastActiveTime;

    public String getSqlId() {
        return sqlId;
    }
    public void setSqlId(String sqlId) {
        this.sqlId = sqlId;
    }
    public String getSqlText() {
        return sqlText;
    }
    public void setSqlText(String sqlText) {
        this.sqlText = sqlText;
    }
    public double getElapsedSeconds() {
        return elapsedSeconds;

    }
    public void setElapsedSeconds(double elapsedSeconds) {
        this.elapsedSeconds = elapsedSeconds;
    }
    public Date getLastActiveTime() {
        return lastActiveTime;
    }
    public void setLastActiveTime(Date lastActiveTime) {
        this.lastActiveTime = lastActiveTime;
    }

}
