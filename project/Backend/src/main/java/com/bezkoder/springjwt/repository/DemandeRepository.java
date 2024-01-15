package com.bezkoder.springjwt.repository;


import com.bezkoder.springjwt.models.Demande;
import com.bezkoder.springjwt.models.Status;
import com.bezkoder.springjwt.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DemandeRepository extends JpaRepository<Demande, Integer> {

    Demande findById(int id);
    //Demande findByStatus(Status status);
    List<Demande> findByStatus(Status status);
    List<Demande> findByUser(User user);

}
