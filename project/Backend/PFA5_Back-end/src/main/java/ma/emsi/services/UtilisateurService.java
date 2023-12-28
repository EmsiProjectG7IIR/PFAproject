package ma.emsi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.emsi.entities.Utilisateur;
import ma.emsi.repositories.UtilisateurRep;

@Service
public class UtilisateurService {
	
	@Autowired
	private UtilisateurRep utilisateurRep;

	public <S extends Utilisateur> S save(S entity) {
		return utilisateurRep.save(entity);
	}

	public void delete(Utilisateur entity) {
		utilisateurRep.delete(entity);
	}
	
	

}
