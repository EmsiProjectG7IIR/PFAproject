package ma.emsi.security.springjwt.repository;

import java.util.Optional;

import ma.emsi.security.springjwt.models.ERole;
import ma.emsi.security.springjwt.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;






@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
