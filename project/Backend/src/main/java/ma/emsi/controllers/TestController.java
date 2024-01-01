package ma.emsi.controllers;

import ma.emsi.entities.EmailDetails;
import ma.emsi.entities.User;
import ma.emsi.services.EmailServiceImpl;
import ma.emsi.services.UserDetailsServiceImpl;
import ma.emsi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {

    private UserDetailsServiceImpl userService;
    private UserService userService2;

    @Autowired
    EmailServiceImpl emailService;

 	@PostMapping("/sendMail")
 	
 	public String
 	sendMail(@RequestBody EmailDetails details)
 	{
 		String status = emailService.sendSimpleMail(details);

 		return status;
 	}

  @GetMapping("/all")
  public String allAccess() {
    return "Public Content.";
  }

  @GetMapping("/driver")
  @PreAuthorize("hasRole('ROLE_DRIVER') or hasRole('ROLE_AGENT') or hasRole('ROLE_ADMIN')")
  public String userAccess() {
    return "User Content.";
  }

  @GetMapping("/agent")
  @PreAuthorize("hasRole('ROLE_AGENT')")
  public String moderatorAccess() {
    return "Moderator Board.";
  }
  
  @GetMapping("/userss")
  public List<User> findAll(){
      return userService2.findAll();
  }
  
  @GetMapping("/username/{username}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public UserDetails findByUsername(@PathVariable String username){
      return userService.loadUserByUsername(username);
  }
  
  @GetMapping("/admin")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public String adminAccess() {
    return "Admin Board.";
  }
}
