package ma.emsi.services;



import ma.emsi.entities.Utilisateur;
import ma.emsi.repositories.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceUseer {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public Optional<Utilisateur> findById(Long id) {
        return utilisateurRepository.findById(id);
    }

    public Utilisateur save(Utilisateur user) {
        return utilisateurRepository.save(user);
    }

    public void deleteById(Long id) {
        utilisateurRepository.deleteById(id);
    }

    public List<Utilisateur> findAll() {
        return utilisateurRepository.findAll();
    }

    public void deleteAll() {
        utilisateurRepository.deleteAll();
    }
}