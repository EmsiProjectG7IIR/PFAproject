package ma.emsi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import ma.emsi.entities.Demande;
import ma.emsi.services.DemandeService;

@RestController
public class DemandeController {
	
	@Autowired
	private DemandeService demandeService;

	public <S extends Demande> S save(S entity) {
		return demandeService.save(entity);
	}

	public void delete(Demande entity) {
		demandeService.delete(entity);
	}
	
	
	

}
