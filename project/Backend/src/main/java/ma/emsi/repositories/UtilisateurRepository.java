package ma.emsi.repositories;


import ma.emsi.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

    Optional<Utilisateur> findById(Long id);
    Utilisateur save(Utilisateur user);

    void deleteById(Long id);

    @Override
    List<Utilisateur> findAll();
}
