package ma.fstt.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name="USERS_ORCL")

public class OrclUsers implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "USER_SEQ", allocationSize = 1)
     Long id;
     String username; // Nom d'utilisateur Oracle
     String password;// Mot de passe (haché)
    private String TablespaceQuota;
    private String defaultTablespaceName;
    private Boolean Enabled;
    public Date dateCreation;
    @ManyToMany(fetch = FetchType.EAGER)
    @JsonIgnore
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
     Set<OrclRoles> roles;

    // Default constructor
    public OrclUsers() {
    }

    // Constructor with all fields
    public OrclUsers(Long id, String username, Date dateCreation,String password,Boolean Enabled, Set<OrclRoles> roles  , String newTablespaceQuota , String defaultTablespaceName) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.roles = roles;
        this.defaultTablespaceName = defaultTablespaceName;
        this.TablespaceQuota = newTablespaceQuota;
        this.Enabled = Enabled;
        this.dateCreation=dateCreation;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }
    public void setEnabled(Boolean Enabled) {
        this.Enabled = Enabled;
    }
    public Boolean getEnabled(){
        return Enabled   ;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<OrclRoles> getRoles() {
        return roles;
    }

    public void setRoles(Set<OrclRoles> roles) {
        this.roles = roles;
    }
    public String getNewTablespaceQuota() {
        return TablespaceQuota;
    }

    public void setNewTablespaceQuota(String newTablespaceQuota) {
        this.TablespaceQuota = newTablespaceQuota;
    }
    public String getDefaultTablespaceName() {
        return defaultTablespaceName;
    }

    public void setDefaultTablespaceName(String defaultTablespaceName) {
        this.defaultTablespaceName = defaultTablespaceName;
    }
}
