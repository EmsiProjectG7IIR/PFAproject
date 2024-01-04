package com.bezkoder.springjwt.controllers;


import com.bezkoder.springjwt.models.Demande;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.security.services.DemandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/demande")
public class DemandeController {
    @Autowired
    private DemandeService demandeService;

    @PutMapping("/update")
    public void update(@RequestBody Demande demande) {
        demandeService.update(demande);
    }

    @GetMapping("/all")
    public List<Demande> findAll() {
        return demandeService.findAll();
    }

    @GetMapping("/find/{id}")
    public Demande findById(@PathVariable int id)  {
        return this.demandeService.findById(id);
    }
    @DeleteMapping("/id/{id}")
    public void deleteById(@PathVariable int id) {
        demandeService.deleteById(id);
    }

    @PostMapping("/save")
    public Demande save(@RequestBody Demande demande) {
        return demandeService.save(demande);
    }

    @GetMapping("/findByUser")
    public List<Demande> findByUser(@RequestBody User user) {
        return demandeService.findByUser(user);
    }
}
