package com.example.demo.security.springjwt.controllers;

import java.util.List;

import ma.emsi.security.springjwt.security.jwt.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ma.emsi.security.springjwt.models.User;
import ma.emsi.security.springjwt.security.jwt.services.UserDetailsServiceImpl;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
    private UserDetailsServiceImpl userService;
    private UserService userService2;




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
