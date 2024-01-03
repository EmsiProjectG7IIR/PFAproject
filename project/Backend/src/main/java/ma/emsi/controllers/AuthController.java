package ma.emsi.controllers;


import jakarta.validation.Valid;
import ma.emsi.entities.ChangeRoleRequest;
import ma.emsi.entities.ERole;
import ma.emsi.entities.Role;
import ma.emsi.entities.User;
import ma.emsi.jwt.JwtUtils;
import ma.emsi.payload.request.LoginRequest;
import ma.emsi.payload.request.SignupRequest;
import ma.emsi.payload.response.JwtResponse;
import ma.emsi.payload.response.MessageResponse;
import ma.emsi.repositories.RoleRepository;
import ma.emsi.repositories.UserRepository;


import ma.emsi.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
 // @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

 // @Autowired
  PasswordEncoder encoder;

 // @Autowired
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

  @PutMapping("/users/{username}/changeRole")
  @PreAuthorize("hasRole('ADMIN')") // Only admin can change user roles
  public ResponseEntity<?> changeUserRole(
      @PathVariable String username, @Valid @RequestBody ChangeRoleRequest changeRoleRequest) {

    Optional<User> optionalUser = userRepository.findByUsername(username);
    if (optionalUser.isEmpty()) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: User not found."));
    }

    User user = optionalUser.get();
    Set<String> strRoles = changeRoleRequest.getRoles();
    Set<Role> roles = new HashSet<>();
    

    if (strRoles != null) {
      strRoles.forEach(role -> {
        switch (role) {
          case "ROLE_ADMIN":
            Role adminRole = roleRepository.findByName(ERole.ROLE_MANAGER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);
//            break;
//          case "ROLE_AGENT":
//            Role modRole = roleRepository.findByName(ERole.ROLE_EMPLOYEE)
//                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//            roles.add(modRole);
//            break;
          default:
            Role userRole = roleRepository.findByName(ERole.ROLE_EMPLOYEE)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User roles updated successfully!"));
  }

  
  @GetMapping("/users/mod")
  @PreAuthorize("permitAll()")
  public ResponseEntity<List<User>> findMod() {
      List<User> users = userRepository.findEmployee();
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
      List<User> users = userRepository.findAll();
      return ResponseEntity.ok(users);
  }
  @GetMapping("/roles")
  @PreAuthorize("permitAll()")
  public List<Role> findAllRoles(){
	  
	return roleRepository.findAll();
	  
  }
  
  
  //@PutMapping("/users/{userId}/password")

//  public ResponseEntity<?> updatePassword(
//      @PathVariable Long userId, @Valid @RequestBody com.example.demo.service.ChangePasswordRequest updatePasswordRequest) {
//
//    User user = userRepository.getReferenceById(userId);
//
//    if (!encoder.matches(updatePasswordRequest.getOldPassword(), user.getPassword())) {
//      throw new BadCredentialsException("Invalid old password");
//    }
//
//    user.setPassword(encoder.encode(updatePasswordRequest.getNewPassword()));
//    userRepository.save(user);
//
//    return ResponseEntity.ok(new MessageResponse("Password updated successfully"));
//  }
  
  
//  @PutMapping("/users/{mail}/resetPassword")
//
//  public ResponseEntity<?> ResetPassword(
//      @PathVariable String mail, @Valid @RequestBody com.example.demo.service.ChangePasswordFromMail updatePasswordRequest) {
//
//    User user = userRepository.findByEmail(mail);
//    System.out.println("yyy"+ user);
//    List<User> users=userRepository.findAll();
//    for(User u:users) {
//    	if(user.getEmail()==u.getEmail()) {
//    		 user.setPassword(encoder.encode(updatePasswordRequest.getNewPassword()));
//    		    userRepository.save(user);
//    	}
//    	else {
//    		 return ResponseEntity
//    		          .badRequest()
//    		          .body(new MessageResponse("Error: mail does not exist!"));
//    		    }
//
//    	}
//    return ResponseEntity.ok(new MessageResponse("Password updated successfully"));
//
//    }
//
//
//
  
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
      Role userRole = roleRepository.findByName(ERole.ROLE_EMPLOYEE)
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
        case "admin":
          Role adminRole = roleRepository.findByName(ERole.ROLE_MANAGER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(adminRole);

          break;
        case "agent":
          Role modRole = roleRepository.findByName(ERole.ROLE_MANAGER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(modRole);

          break;
        default:
          Role userRole = roleRepository.findByName(ERole.ROLE_EMPLOYEE)
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