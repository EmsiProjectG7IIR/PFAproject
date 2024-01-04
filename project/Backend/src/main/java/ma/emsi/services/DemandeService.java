package ma.emsi.services;

import ma.emsi.dao.IDao;

import ma.emsi.entities.Utilisateur;
import ma.emsi.repositories.DemandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ma.emsi.entities.Demande;

import java.util.List;
import java.util.Optional;

@Service
public class DemandeService  {

	@Autowired
	private DemandeRepository demandeRepository;

	private static final Logger logger = LoggerFactory.getLogger(Demande.class);



	public Demande save(Demande demande) {
		Utilisateur user = demande.getUtilisateur();
		if (user == null){
			logger.warn("User not found!!");
			return null;
		}else{
			System.out.println("test : "+user);

			demande.setUtilisateur(user);
			return demandeRepository.save(demande);
		}
	}
	public void update(Demande pharmacie) {
		demandeRepository.save(pharmacie);
	}

	public void deleteById(int id) {
		demandeRepository.deleteById(id);
	}

	public void delete(Demande demande) {
		demandeRepository.delete(demande);
	}




	public Demande findById(int id) {
		return demandeRepository.findById(id);
	}



	public List<Demande> findAll() {
		return demandeRepository.findAll();
	}

}