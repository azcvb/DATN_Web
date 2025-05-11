package com.datn.sellWatches.Service;

import com.datn.sellWatches.DTO.Request.StringRequest;
import com.datn.sellWatches.Entity.Role;
import com.datn.sellWatches.Repository.RoleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoleService {
    private final RoleRepository roleRepository;

    @PreAuthorize("hasRole('ADMIN')")
    public  Boolean createUserRole(StringRequest request) {
        try{
            if(roleRepository.existsByTenQuyen(request.getName())) {
                return false;
            }
            Role role = Role.builder()
                    .tenQuyen(request.getName())
                    .build();
            roleRepository.save(role);
        }catch (Exception err){
            log.info(err.toString());
            return false;
        }

        return true;
    }
}
