package com.datn.sellWatches.Repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.datn.sellWatches.Entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, String>{
	Optional<Account> findByTenTaiKhoan(String name);
}
