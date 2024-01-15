package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.bezkoder.springjwt.models.Type;

@Repository
public interface TypeRepository extends JpaRepository<Type, Long> {
}
