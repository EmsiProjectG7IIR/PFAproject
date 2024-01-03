package ma.emsi.controllers;

import ma.emsi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import ma.emsi.entities.User;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UtilisateurController {
	
	@Autowired
	private UserService userService;

	@PostMapping("/save")
	public User save(@RequestBody User o) {
		return userService.save(o);
	}

	@DeleteMapping("/deleteById/{id}")
	public void deleteById(@PathVariable Long id) {
		userService.deleteById(id);
	}

	@GetMapping("/findById/{id}")
	public Optional<User> findById(@PathVariable Long id) {
		return userService.findById(id);
	}

	@GetMapping("/all")
	public List<User> findAll() {
		return userService.findAll();
	}
}
