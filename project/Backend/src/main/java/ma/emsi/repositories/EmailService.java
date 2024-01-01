package ma.emsi.repositories;

import ma.emsi.entities.EmailDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailService {

	// Method
	// To send a simple email
	String sendSimpleMail(EmailDetails details);
    
	// Method
	// To send an email with attachment
	String sendMailWithAttachment(EmailDetails details);
}

