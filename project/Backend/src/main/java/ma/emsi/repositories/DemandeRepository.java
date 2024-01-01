package ma.emsi.repositories;

import ma.emsi.entities.Demande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandeRepository extends JpaRepository<Demande, Long> {
    void update (Demande demande);
    Demande findById(long id);
}
