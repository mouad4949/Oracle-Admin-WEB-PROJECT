package ma.fstt.backend.repository;

import ma.fstt.backend.entities.OrclPrivilege;
import ma.fstt.backend.entities.PrivilegeEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PrivilegeRepository extends JpaRepository<OrclPrivilege,Long> {
    Optional<OrclPrivilege> findByName(PrivilegeEnum name);
}
