package ma.emsi.backend.persistence;

import ma.emsi.backend.dto.*;
import ma.emsi.backend.models.*;
import ma.emsi.backend.persistence.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoleRepository extends JpaRepository<Role,Integer> {

    Role findByRoleName(RoleName roleName);


}
