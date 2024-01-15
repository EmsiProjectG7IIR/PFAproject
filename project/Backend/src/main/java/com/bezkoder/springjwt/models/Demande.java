package com.bezkoder.springjwt.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class Demande {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String description;
	private String type;
	private Date date;
	@Enumerated(EnumType.STRING)
	private Status status;
	@ManyToOne
	User user;
	


}
