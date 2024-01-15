package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Type;
import com.bezkoder.springjwt.security.services.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/type")
public class TypeController {
    @Autowired
    private TypeService typeService;


    @GetMapping("/all")
    public List<Type> findAll() {
        return typeService.findAll();
    }
}
