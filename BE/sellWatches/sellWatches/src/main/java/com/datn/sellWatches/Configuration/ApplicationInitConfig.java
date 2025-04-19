package com.datn.sellWatches.Configuration;

import java.util.HashSet;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.datn.sellWatches.Entity.Account;
import com.datn.sellWatches.Entity.Role;
import com.datn.sellWatches.Exception.AppException;
import com.datn.sellWatches.Exception.ErrorCode;
import com.datn.sellWatches.Repository.AccountRepository;
import com.datn.sellWatches.Repository.RoleRepository;

import Enums.Roles;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {

	PasswordEncoder passwordEncoder;
	RoleRepository roleRepository;
 
	
	@Bean
	ApplicationRunner applicationRunner(AccountRepository accountRepository) {
		return args -> {
			if(accountRepository.findByTenTaiKhoan("admin").isEmpty()) {
				Role role = new Role();
				if(roleRepository.findByTenQuyen(Roles.ADMIN.name()).isEmpty()) {
					role = Role.builder()
							.tenQuyen(Roles.ADMIN.name())
							.build();
					roleRepository.save(role);
				}else {
					role = roleRepository.findByTenQuyen(Roles.ADMIN.name())
							.orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXIT));
				}
				
				Account account = Account.builder()
                        .tenTaiKhoan("admin")
                        .matKhau(passwordEncoder.encode("admin"))
                        .quyen(role)
                        .build();
				accountRepository.save(account);
				log.warn("admin user has been created with default password: admin, please change it");
			}
		};
	}

}
