package ma.emsi.controllers;

import ma.emsi.entities.Utilisateur;
import ma.emsi.services.ServiceUseer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UtilisateurController {
	
	@Autowired
	private ServiceUseer userService;

	@PostMapping("/save")
	public Utilisateur save(@RequestBody Utilisateur o) {
		return userService.save(o);
	}

	@DeleteMapping("/deleteById/{id}")
	public void deleteById(@PathVariable Long id) {
		userService.deleteById(id);
	}

	@GetMapping("/findById/{id}")
	public Optional<Utilisateur> findById(@PathVariable Long id) {
		return userService.findById(id);
	}

	@GetMapping("/all")
	public List<Utilisateur> findAll() {
		return userService.findAll();
	}
}
