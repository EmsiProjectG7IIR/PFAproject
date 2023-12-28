package ma.emsi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.emsi.entities.Personne;

public interface PersonneRep extends JpaRepository<Personne, Long>{

}
