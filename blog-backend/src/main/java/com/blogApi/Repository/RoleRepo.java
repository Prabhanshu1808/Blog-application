package com.blogApi.Repository;

import com.blogApi.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role , Integer> {
}
