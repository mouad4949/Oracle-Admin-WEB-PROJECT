package ma.fstt.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;
@Entity
@Table(name="PRIVILEGES_ORCL")

public class OrclPrivilege {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "privilege_seq")
    @SequenceGenerator(name = "privilege_seq", sequenceName = "PRIVILEGE_SEQ", allocationSize = 1)
    private Long id;
    @Enumerated(EnumType.STRING)
    private PrivilegeEnum name; // Nom du privilège (CREATE_USER, DELETE_USER, etc.)
    @ManyToMany(mappedBy = "privileges", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<OrclRoles> roles;

    // Default constructor
    public OrclPrivilege() {
    }

    // Constructor with all fields
    public OrclPrivilege(Long id, PrivilegeEnum name, Set<OrclRoles> roles) {
        this.id = id;
        this.name = name;
        this.roles = roles;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PrivilegeEnum getName() {
        return name;
    }

    public void setName(PrivilegeEnum name) {
        this.name = name;
    }

    public Set<OrclRoles> getRoles() {
        return roles;
    }

    public void setRoles(Set<OrclRoles> roles) {
        this.roles = roles;
    }
}
