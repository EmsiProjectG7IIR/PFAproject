package ma.emsi.backend.businessLogic;


import ma.emsi.backend.dto.LoginDto;
import ma.emsi.backend.dto.RegisterDto;
import ma.emsi.backend.models.Role;
import ma.emsi.backend.models.User;
import org.springframework.http.ResponseEntity;


public interface IUserService {
   //ResponseEntity<?> register (RegisterDto registerDto);
 //  ResponseEntity<BearerToken> authenticate(LoginDto loginDto);

   String authenticate(LoginDto loginDto);
   ResponseEntity<?> register (RegisterDto registerDto);
   Role saveRole(Role role);

   User saverUser (User user) ;
}
