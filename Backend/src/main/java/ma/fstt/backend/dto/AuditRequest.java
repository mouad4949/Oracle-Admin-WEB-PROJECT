package ma.fstt.backend.dto;

public class AuditRequest {
    private String action;

    // Getter pour action
    public String getAction() {
        return action;
    }

    // Setter pour action
    public void setAction(String action) {
        this.action = action;
    }

    // Méthode toString pour l'affichage
    @Override
    public String toString() {
        return "AuditRequest{" +
                "action='" + action + '\'' +
                '}';
    }
}
