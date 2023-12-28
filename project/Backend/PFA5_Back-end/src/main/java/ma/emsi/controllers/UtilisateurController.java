package ma.emsi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import ma.emsi.entities.Utilisateur;
import ma.emsi.services.UtilisateurService;

@RestController
public class UtilisateurController {
	
	@Autowired
	private UtilisateurService utilisateurService;

	public <S extends Utilisateur> S save(S entity) {
		return utilisateurService.save(entity);
	}

	public void delete(Utilisateur entity) {
		utilisateurService.delete(entity);
	}
	
	

}
