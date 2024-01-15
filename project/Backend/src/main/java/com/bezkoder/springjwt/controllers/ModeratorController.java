package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Demande;
import com.bezkoder.springjwt.models.Status;
import com.bezkoder.springjwt.repository.DemandeRepository;
import com.bezkoder.springjwt.security.services.DemandeService;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")

@RequestMapping("/moderator")
public class ModeratorController {
    @Autowired
    private DemandeService demandeService;

    @GetMapping("/viewRequests")
    @PermitAll
    public List<Demande> viewRequests() {
        return demandeService.findByStatus(Status.valueOf("PENDING"));
    }
    @PostMapping("/demande/{requestId}/{status}")
    public String processRequest(@PathVariable int requestId, @PathVariable Status status) {
        Demande request = demandeService.findById(requestId);
        if (request != null) {
            request.setStatus(status);
            demandeService.save(request);
            return "Request processed successfully.";
        } else {
            return "Request not found.";
        }
    }
}