package ma.fstt.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table (name="ROLES_ORCL")
public class OrclRoles {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_seq")
    @SequenceGenerator(name = "role_seq", sequenceName = "ROLE_SEQ", allocationSize = 1)
    private Long id;
    @Enumerated(EnumType.STRING)
    private RoleEnum name; // Nom du rôle (ADMIN, USER, etc.)
    private String roleName;
    private String password;
    @ManyToMany(mappedBy = "roles",fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<OrclUsers> users;

    @ManyToMany(fetch = FetchType.EAGER)
    @JsonIgnore
    @JoinTable(name = "roles_privileges",
            joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "privilege_id"))
    private Set<OrclPrivilege> privileges;

    // Default constructor
    public OrclRoles() {
    }

    // Constructor with all fields
    public OrclRoles(Long id, RoleEnum name, Set<OrclUsers> users, Set<OrclPrivilege> privileges) {
        this.id = id;
        this.name = name;
        this.users = users;
        this.privileges = privileges;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RoleEnum getName() {
        return name;
    }

    public void setRoleName(String rolename) {

        this.roleName = rolename;
    }
    public String getRoleName() {

        return roleName;
    }
    public void setPassword(String name) {
        this.password = name;
    }
    public String getPassword() {
        return password;
    }

    public void setName(RoleEnum name) {
        this.name = name;
    }

    public Set<OrclUsers> getUsers() {
        return users;
    }

    public void setUsers(Set<OrclUsers> users) {
        this.users = users;
    }

    public Set<OrclPrivilege> getPrivileges() {
        return privileges;
    }

    public void setPrivileges(Set<OrclPrivilege> privileges) {
        this.privileges = privileges;
    }

}
