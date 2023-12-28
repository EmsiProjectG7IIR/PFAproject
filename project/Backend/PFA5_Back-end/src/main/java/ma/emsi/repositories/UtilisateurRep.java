package ma.emsi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.emsi.entities.Utilisateur;

public interface UtilisateurRep extends JpaRepository<Utilisateur, Long> {

}
