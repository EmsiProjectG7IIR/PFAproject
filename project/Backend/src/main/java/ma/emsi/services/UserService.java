package ma.emsi.services;


import ma.emsi.dao.IDao;
import ma.emsi.entities.User;
import ma.emsi.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IDao<User> {

    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public User save(User o) {
        return null;
    }

    @Override
    public void update(User o) {

    }

    @Override
    public void delete(User o) {
    }

    @Override
    public Optional<User> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }
}