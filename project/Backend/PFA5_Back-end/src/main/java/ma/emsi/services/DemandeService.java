package ma.emsi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.emsi.entities.Demande;
import ma.emsi.repositories.DemandeRep;

@Service
public class DemandeService {
	
	@Autowired
	private DemandeRep demandeRep;

	public <S extends Demande> S save(S entity) {
		return demandeRep.save(entity);
	}

	public void delete(Demande entity) {
		demandeRep.delete(entity);
	}
	
	

}
