package ma.fstt.backend.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


public class ASHReport {
    private Date sampleTime;
    private String sqlId;
    private String event;
    private String sessionState;

    public Date getSampleTime() {
        return sampleTime;
    }
    public void setSampleTime(Date sampleTime) {
        this.sampleTime = sampleTime;
    }
    public String getSqlId() {
        return sqlId;
    }
    public void setSqlId(String sqlId) {
        this.sqlId = sqlId;
    }
    public String getEvent() {
        return event;
    }
    public void setEvent(String event) {
        this.event = event;
    }
    public String getSessionState() {
        return sessionState;
    }
    public void setSessionState(String sessionState) {
        this.sessionState = sessionState;
    }

}