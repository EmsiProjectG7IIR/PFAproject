package ma.emsi.repositories;

import ma.emsi.entities.ERole;
import ma.emsi.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    User findByEmail(String email);
    Boolean existsByUsername(String username);

    @Query("SELECT u FROM User u JOIN u.role r WHERE r.name = 'ROLE_ADMIN'")
    List<User> findAdmin();

    @Query("SELECT u FROM User u JOIN u.role r WHERE r.name = 'ROLE_MODERATOR'")
    List<User> findMod();

    @Query("SELECT u FROM User u JOIN u.role r WHERE r.name = 'ROLE_USER'")
    List<User> findUser();

    @Query("SELECT r.name FROM User u JOIN u.role r WHERE u.username=?1")
    ERole findRole(String username);

    Boolean existsByEmail(String email);

}
