package ma.emsi.controllers;

import ma.emsi.entities.EmailDetails;
import ma.emsi.entities.User;
import ma.emsi.payload.response.MessageResponse;
import ma.emsi.repositories.EmailService;
import ma.emsi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/url")
public class SendMail {
	@Autowired
	EmailService emailService;
	@Autowired
	PasswordEncoder encoder;
	@Autowired
	UserRepository userRepository;

	@PostMapping("/sendMail")
	public String sendMail(@RequestBody EmailDetails details) {
		String status = emailService.sendSimpleMail(details);

		return status;

	}

	/*@PutMapping("/users/{mail}/resetPassword")
	public ResponseEntity<?> resetPassword(@PathVariable String mail,
	                                       @Valid @RequestBody com.example.demo.service.ChangePasswordFromMail updatePasswordRequest) {

	    List<User> users = userRepository.findAll();
	    System.out.println("yyy" + users);
	    for (User u : users) {
	        if (mail.equals(u.getEmail())) {
	            System.out.println("yyy" + u.getUsername());
	            u.setPassword(encoder.encode(updatePasswordRequest.getNewPassword()));
	            userRepository.save(u);
	            return ResponseEntity.ok(new MessageResponse("Password updated successfully"));
	        }
	    }
	    return ResponseEntity.badRequest().body(new MessageResponse("Error: mail does not exist!"));
	}*/
	
	@GetMapping("/check/{mail}")
	public ResponseEntity<?> checkMail(@PathVariable String mail) {

	    List<User> users = userRepository.findAll();
	    System.out.println("yyy" + users);
	    for (User u : users) {
	        if (mail.equals(u.getEmail())) {
	            System.out.println("yyy" + u.getUsername());
	           
	            return ResponseEntity.ok(new MessageResponse("email exist "));
	        }
	    }
	    return ResponseEntity.badRequest().body(new MessageResponse("Error: mail does not exist!"));
	}

}
