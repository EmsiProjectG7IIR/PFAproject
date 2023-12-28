package ma.emsi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import ma.emsi.entities.Personne;
import ma.emsi.services.PersonneService;

@RestController
public class PersonneController {
	
	@Autowired
	private PersonneService personneService;

	public <S extends Personne> S save(S entity) {
		return personneService.save(entity);
	}

	public void delete(Personne entity) {
		personneService.delete(entity);
	}
	
	
	

}
