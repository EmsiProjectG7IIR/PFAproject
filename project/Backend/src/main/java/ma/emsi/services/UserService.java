package ma.emsi.services;


import ma.emsi.dao.IDao;
import ma.emsi.entities.User;
import ma.emsi.repositories.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public Optional<User> findById(Long id) {
        return utilisateurRepository.findById(id);
    }

    public User save(User user) {
        return utilisateurRepository.save(user);
    }

    public void deleteById(Long id) {
        utilisateurRepository.deleteById(id);
    }

    public List<User> findAll() {
        return utilisateurRepository.findAll();
    }

    public void deleteAll() {
        utilisateurRepository.deleteAll();
    }
}