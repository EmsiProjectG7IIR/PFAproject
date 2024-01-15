package com.bezkoder.springjwt.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

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


	@ManyToOne
    private Type type;


	private Date date;
	@Enumerated(jakarta.persistence.EnumType.STRING)
	private Status status;
	@ManyToOne
	User user;
	


}
