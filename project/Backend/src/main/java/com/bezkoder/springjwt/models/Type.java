package com.bezkoder.springjwt.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class Type {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Enumerated(jakarta.persistence.EnumType.STRING)
    @Column(length = 20)
    private EnumType type;
}
