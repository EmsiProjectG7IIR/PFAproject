package ma.emsi.repositories;

import ma.emsi.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;



public interface UtilisateurRepository extends JpaRepository<User, Long> {

}
