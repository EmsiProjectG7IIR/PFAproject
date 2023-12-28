package ma.emsi.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

@Entity
public class Utilisateur extends Personne {
	
	@ManyToOne
	private Demande demande;
	

}
