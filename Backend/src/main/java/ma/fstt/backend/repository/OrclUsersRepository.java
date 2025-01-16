package ma.fstt.backend.repository;

import ma.fstt.backend.entities.OrclUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrclUsersRepository extends JpaRepository<OrclUsers,Long> {
    Optional<OrclUsers> findOrclUsersByUsername(String username);

}
