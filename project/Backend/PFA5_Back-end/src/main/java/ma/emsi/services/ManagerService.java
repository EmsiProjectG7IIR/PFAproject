package ma.emsi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.emsi.entities.Manager;
import ma.emsi.repositories.ManagerRep;

@Service
public class ManagerService {
	
	@Autowired
	private ManagerRep managerRep;

	public <S extends Manager> S save(S entity) {
		return managerRep.save(entity);
	}

	public void delete(Manager entity) {
		managerRep.delete(entity);
	}
	
	

}
