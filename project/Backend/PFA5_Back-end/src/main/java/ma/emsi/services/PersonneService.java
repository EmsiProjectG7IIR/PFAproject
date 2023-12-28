package ma.emsi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.emsi.entities.Personne;
import ma.emsi.repositories.PersonneRep;

@Service
public class PersonneService {
	
	@Autowired
	private PersonneRep personneRep;

	public <S extends Personne> S save(S entity) {
		return personneRep.save(entity);
	}

	public void delete(Personne entity) {
		personneRep.delete(entity);
	}
	
	

}
