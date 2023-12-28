package ma.emsi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.emsi.entities.Manager;

public interface ManagerRep extends JpaRepository<Manager, Long>{

}
