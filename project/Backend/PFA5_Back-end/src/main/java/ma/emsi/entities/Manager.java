package ma.emsi.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;


@Entity
public class Manager extends Personne {
	
	@ManyToMany
	private List<Demande> demandes;
	

}
