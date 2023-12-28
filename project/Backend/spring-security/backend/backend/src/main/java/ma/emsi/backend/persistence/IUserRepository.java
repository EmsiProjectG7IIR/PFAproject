package ma.emsi.backend.persistence;

import ma.emsi.backend.dto.*;
import ma.emsi.backend.models.*;
import ma.emsi.backend.persistence.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUserRepository extends JpaRepository<User,Integer> {

    Boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);


}


