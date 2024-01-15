package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.models.Demande;
import com.bezkoder.springjwt.models.Type;
import com.bezkoder.springjwt.repository.DemandeRepository;
import com.bezkoder.springjwt.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class TypeService {
    @Autowired
    private TypeRepository typeRepository;

    public List<Type> findAll() {
        return typeRepository.findAll();
    }
}
