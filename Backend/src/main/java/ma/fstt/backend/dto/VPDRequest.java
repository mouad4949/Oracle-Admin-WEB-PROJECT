package ma.fstt.backend.dto;

public class VPDRequest {
    private String fonction;
    private String fonctionName;
    private String policyName;
    private String nomTable;


    public String getFonction() {
        return fonction;
    }

    public void setFonction(String fonction) {
        this.fonction = fonction;
    }

    public String getFonctionName() {
        return fonctionName;
    }

    public void setFonctionName(String fonctionName) {
        this.fonctionName = fonctionName;
    }

    // Getter et Setter pour 'policyName'
    public String getPolicyName() {
        return policyName;
    }

    public void setPolicyName(String policyName) {
        this.policyName = policyName;
    }

    // Getter et Setter pour 'nomTable'
    public String getNomTable() {
        return nomTable;
    }

    public void setNomTable(String nomTable) {
        this.nomTable = nomTable;
    }


}

