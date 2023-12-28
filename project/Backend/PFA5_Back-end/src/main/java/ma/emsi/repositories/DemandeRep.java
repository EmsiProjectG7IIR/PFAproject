package ma.emsi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.emsi.entities.Demande;

public interface DemandeRep extends JpaRepository<Demande, Long> {

}
