package ma.emsi.security.springjwt.models;

import java.util.Set;

public class ChangeRoleRequest {
	
	
	private Set<String> roles;

	public Set<String> getRoles() {
		return roles;
	}

	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}
}