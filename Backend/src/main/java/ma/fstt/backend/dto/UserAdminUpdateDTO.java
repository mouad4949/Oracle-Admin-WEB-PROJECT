package ma.fstt.backend.dto;

import java.util.List;

public class UserAdminUpdateDTO {
    Long id;
    private String newusername;
    private String newPassword;
    private String newTablespaceQuota; // Ex: "100M", "UNLIMITED"
    private String defaultTablespaceName;
    private Boolean accountLocked; // true pour verrouiller, false pour déverrouiller
    private String newProfileName;
    private List<String> roleNames;
    private List<String> privilegesToGrant;
    private List<String> privilegesToRevoke;
    private boolean deleteUser;
    private boolean disableUser;

    // Constructeur par défaut
    public UserAdminUpdateDTO() {
    }

    // Constructeur avec tous les champs
    public UserAdminUpdateDTO( Long id,   String username,  String newPassword,
                              String newTablespaceQuota, String newProfileName, Boolean accountLocked,
                              String defaultTablespaceName, List<String> roleNames,
                              List<String> privilegesToGrant, List<String> privilegesToRevoke,
                              boolean deleteUser, boolean disableUser) {
        this.newusername = username;
        this.newPassword = newPassword;
        this.newTablespaceQuota = newTablespaceQuota;
        this.newProfileName = newProfileName;
        this.accountLocked = accountLocked;
        this.defaultTablespaceName = defaultTablespaceName;
        this.roleNames = roleNames;
        this.privilegesToGrant = privilegesToGrant;
        this.privilegesToRevoke = privilegesToRevoke;
        this.deleteUser = deleteUser;
        this.disableUser = disableUser;
        this.id = id;
    }
    public Long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    public String getNewPassword() {
        return newPassword;
    }
    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getNewTablespaceQuota() {
        return newTablespaceQuota;
    }

    public void setNewTablespaceQuota(String newTablespaceQuota) {
        this.newTablespaceQuota = newTablespaceQuota;
    }

    public Boolean getAccountLocked() {
        return accountLocked;
    }

    public void setAccountLocked(Boolean accountLocked) {
        this.accountLocked = accountLocked;
    }

    public String getDefaultTablespaceName() {
        return defaultTablespaceName;
    }

    public void setDefaultTablespaceName(String defaultTablespaceName) {
        this.defaultTablespaceName = defaultTablespaceName;
    }

    public List<String> getRoleNames() {
        return roleNames;
    }

    public void setRoleNames(List<String> roleNames) {
        this.roleNames = roleNames;
    }

    public List<String> getPrivilegesToGrant() {
        return privilegesToGrant;
    }

    public void setPrivilegesToGrant(List<String> privilegesToGrant) {
        this.privilegesToGrant = privilegesToGrant;
    }

    public List<String> getPrivilegesToRevoke() {
        return privilegesToRevoke;
    }

    public void setPrivilegesToRevoke(List<String> privilegesToRevoke) {
        this.privilegesToRevoke = privilegesToRevoke;
    }

    public boolean isDeleteUser() {
        return deleteUser;
    }

    public void setDeleteUser(boolean deleteUser) {
        this.deleteUser = deleteUser;
    }

    public boolean isDisableUser() {
        return disableUser;
    }

    public void setDisableUser(boolean disableUser) {
        this.disableUser = disableUser;
    }

}

