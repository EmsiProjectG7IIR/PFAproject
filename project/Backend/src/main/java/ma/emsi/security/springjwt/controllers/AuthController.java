package ma.emsi.security.springjwt.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.validation.Valid;


import ma.emsi.security.springjwt.models.ERole;
import ma.emsi.security.springjwt.models.Role;
import ma.emsi.security.springjwt.models.User;
import ma.emsi.security.springjwt.payload.request.LoginRequest;
import ma.emsi.security.springjwt.payload.request.SignupRequest;
import ma.emsi.security.springjwt.payload.response.JwtResponse;
import ma.emsi.security.springjwt.payload.response.MessageResponse;
import ma.emsi.security.springjwt.repository.RoleRepository;
import ma.emsi.security.springjwt.repository.UserRepository;
import ma.emsi.security.springjwt.security.jwt.JwtUtils;
import ma.emsi.security.springjwt.security.jwt.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
@Autowired

  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;
  
  @GetMapping("/users")
  @PreAuthorize("permitAll()")
  public ResponseEntity<List<User>> findAllUsers() {
      List<User> users = userRepository.findAll();
      return ResponseEntity.ok(users);
  }
  @DeleteMapping("/users/{username}")
  @PreAuthorize("hasRole('ADMIN')") // Only admin can delete users
  public ResponseEntity<?> deleteUser(@PathVariable String username) {
      Optional<User> optionalUser = userRepository.findByUsername(username);
      if (optionalUser.isEmpty()) {
          return ResponseEntity
              .badRequest()
              .body(new MessageResponse("Error: User not found."));
      }

      User user = optionalUser.get();
      userRepository.delete(user);

      return ResponseEntity.ok(new MessageResponse("User deleted successfully!"));
  }

  @GetMapping("/users/mod")
  @PreAuthorize("permitAll()")
  public ResponseEntity<List<User>> findMod() {
      List<User> users = userRepository.findMod();
      return ResponseEntity.ok(users);
  }
  
  @GetMapping("/users/role/{username}")
  @PreAuthorize("permitAll()")
  public ResponseEntity<ERole> findRole(@PathVariable String username) {
	  ERole role = userRepository.findRole(username);
      return ResponseEntity.ok(role);
  }
  
  @GetMapping("/users/user")
  @PreAuthorize("permitAll()")
  public ResponseEntity<List<User>> findUser() {
      List<User> users = userRepository.findUser();
      return ResponseEntity.ok(users);
  }
  @GetMapping("/roles")
  @PreAuthorize("permitAll()")
  public List<Role> findAllRoles(){
	  
	return roleRepository.findAll();
	  
  }
  
  


      
  
  
  @PostMapping("/signin")
  
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
    
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());

    return ResponseEntity.ok(new JwtResponse(jwt,
                         userDetails.getId(), 
                         userDetails.getUsername(), 
                         userDetails.getEmail(), 
                         roles));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Email is already in use!"));
    }

    // Create new user's account
    User user = new User(signUpRequest.getUsername(), 
               signUpRequest.getEmail(),
               encoder.encode(signUpRequest.getPassword()));

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_DRIVER)
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
        case "admin":
          Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(adminRole);

          break;
        case "agent":
          Role modRole = roleRepository.findByName(ERole.ROLE_AGENT)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(modRole);

          break;
        default:
          Role userRole = roleRepository.findByName(ERole.ROLE_DRIVER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(userRole);
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }
}