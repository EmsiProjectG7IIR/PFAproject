package com.bezkoder.springjwt.security.services;


import com.bezkoder.springjwt.models.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.bezkoder.springjwt.models.Demande;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.repository.DemandeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.util.List;

@Service
public class DemandeService  {

	@Autowired
	private DemandeRepository demandeRepository;

	private static final Logger logger = LoggerFactory.getLogger(Demande.class);


	public Demande save(Demande demande) {

		User user = demande.getUser();
		if (user == null){
			logger.warn("User not found!!");
			return null;
		}else{
			System.out.println("test : "+user);

			demande.setUser(user);
			demande.setStatus(Status.PENDING);
			return demandeRepository.save(demande);
		}
	}
	public void update(Demande demande) {
		demandeRepository.save(demande);
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

	public List<Demande> findByUser(User user) {
		return demandeRepository.findByUser(user);
	}

	public List<Demande> findAll() {
		return demandeRepository.findAll();
	}

    public List<Demande> findByStatus(Status status) {
		return	demandeRepository.findByStatus(status);

    }
}