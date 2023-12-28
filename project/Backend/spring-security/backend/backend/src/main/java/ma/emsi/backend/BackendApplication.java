package ma.emsi.backend;

import ma.emsi.backend.*;

import ma.emsi.backend.businessLogic.*;
import ma.emsi.backend.models.Role;
import ma.emsi.backend.models.RoleName;
import ma.emsi.backend.models.User;
import ma.emsi.backend.persistence.IRoleRepository;
import ma.emsi.backend.persistence.IUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }


    //@Bean
//    CommandLineRunner run (IUserService iUserService , IRoleRepository iRoleRepository , IUserRepository iUserRepository , PasswordEncoder passwordEncoder) {
//        return args ->
//        {
//            iUserService.saveRole(new Role(RoleName.ADMIN));
//            iUserService.saveRole(new Role(RoleName.ADMIN));
//            iUserService.saveRole(new Role(RoleName.SUPERADMIN));
//            iUserService.saverUser(new User("admin@gmail.com", passwordEncoder.encode("adminPassword"), new ArrayList<>()));
//
//            Role role = iRoleRepository.findByRoleName(RoleName.ADMIN);
//            User user = iUserRepository.findByEmail("admin@gmail.com").orElse(null);
//            user.getRoles().add(role);
//            iUserService.saverUser(user);
//
//
//        };
  //  }
}
