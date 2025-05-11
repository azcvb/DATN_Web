package com.datn.sellWatches.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.datn.sellWatches.Entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, String>{
	Optional<Role> findByTenQuyen(String name);
	boolean existsByTenQuyen(String tenQuyen);
}
