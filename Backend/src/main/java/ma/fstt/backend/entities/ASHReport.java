package ma.fstt.backend.entities;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
public class ASHReport {

    private Date sampleTime;
    private String sqlId;
    private String event;
    private String sessionState; // ON CPU ou WAITING
    private Long sessionId; //identifiant de la session
    private Long sessionSerial; // numero de serie de la session
    private Long timeWaited; //temps d'attente
    private Long blockingSession;  //identifiant de la session bloquante
    private Long blockingSessionSerial; // numero de serie de la session bloquante
    private int instanceNumber; // identifiant de l'instance

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

    public String getSessionState() {
        return sessionState;
    }

    public void setSessionState(String sessionState) {
        this.sessionState = sessionState;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }

    public Long getSessionSerial() {
        return sessionSerial;
    }

    public void setSessionSerial(Long sessionSerial) {
        this.sessionSerial = sessionSerial;
    }

    public Long getTimeWaited() {
        return timeWaited;
    }

    public void setTimeWaited(Long timeWaited) {
        this.timeWaited = timeWaited;
    }

    public Long getBlockingSession() {
        return blockingSession;
    }

    public void setBlockingSession(Long blockingSession) {
        this.blockingSession = blockingSession;
    }

    public Long getBlockingSessionSerial() {
        return blockingSessionSerial;
    }

    public void setBlockingSessionSerial(Long blockingSessionSerial) {
        this.blockingSessionSerial = blockingSessionSerial;
    }

    public int getInstanceNumber() {
        return instanceNumber;
    }

    public void setInstanceNumber(int instanceNumber) {
        this.instanceNumber = instanceNumber;
    }
}