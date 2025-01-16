package ma.fstt.backend.dto;

import lombok.Data;

import java.util.List;
@Data
public class GrantRoleRequest {
    private String roleName;
    private List<String> rolesNames;
    private String password ;
    private String privilegeName;
    private String username;

    // Constructeur par défaut
    public GrantRoleRequest() {
    }

    // Constructeur avec tous les champs
    public GrantRoleRequest(String roleName, List<String> rolesNames,String password,String privilegeName,String username) {
        this.roleName = roleName;
        this.rolesNames = rolesNames;
        this.password=password;
        this.privilegeName=privilegeName;
        this.username=username;

    }

    // Getter pour usernamen
    public String getRoleName() {
        return roleName;
    }

    // Setter pour usernamen
    public void setRoleName(String usernamen) {
        this.roleName = usernamen;
    }

    public String getPrivilegeName() {
        return privilegeName;
    }

    // Setter pour usernamen
    public void setPrivilegeName(String usernamen) {
        this.privilegeName = privilegeName;
    }

    // Getter pour roleNames
    public List<String> getRoleNames() {
        return rolesNames;
    }

    // Setter pour roleNames
    public void setRoleNames(List<String> roleNames) {
        this.rolesNames = roleNames;
    }
    public String getPassword() {
        return password;
    }

    // Setter pour roleNames
    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    // Setter pour roleNames
    public void setUsername(String username) {
        this.username = username;
    }

}
