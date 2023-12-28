package ma.emsi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import ma.emsi.entities.Manager;
import ma.emsi.services.ManagerService;

@RestController
public class ManagerController {
	
	@Autowired
	private ManagerService managerService;

	public <S extends Manager> S save(S entity) {
		return managerService.save(entity);
	}

	public void delete(Manager entity) {
		managerService.delete(entity);
	}
	
	
	
	

}
