package ma.fstt.backend.repository;

import ma.fstt.backend.entities.OrclRoles;
import ma.fstt.backend.entities.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrclRolesRepository  extends JpaRepository<OrclRoles,Long> {
    Optional<OrclRoles> findByNameOrRoleName(RoleEnum name,String roleName);
    Optional<OrclRoles> findByName(RoleEnum name);
    Optional<OrclRoles> findByRoleName(String roleName);

}
