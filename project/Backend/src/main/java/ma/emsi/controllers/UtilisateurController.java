package ma.emsi.controllers;

import ma.emsi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import ma.emsi.entities.User;

@RestController
public class UtilisateurController {
	
	@Autowired
	private UserService userService;


	

}
