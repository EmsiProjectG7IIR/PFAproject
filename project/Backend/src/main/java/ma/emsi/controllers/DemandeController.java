package ma.emsi.controllers;


import ma.emsi.entities.Demande;
import ma.emsi.repositories.DemandeRepository;
import ma.emsi.services.DemandeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/demande")
public class DemandeController {

    private final DemandeRepository demandeRepository;

    private final DemandeService demandeService;

    public DemandeController(DemandeService demandeService,DemandeRepository demandeRepository) {
        this.demandeService = demandeService;
        this.demandeRepository=demandeRepository;
    }

    @GetMapping("/all")
    public List<Demande> chercherDemandes() {
        return demandeRepository.findAll();
    }

    @GetMapping("/find/{id}")
    public Demande chercherUnDemande(@PathVariable long id)  {
        return this.demandeRepository.findById(id);
    }

    @PostMapping("/save")
    public Demande createDemande(@RequestBody Demande demande) {
        return demandeService.save(demande);
    }

}
