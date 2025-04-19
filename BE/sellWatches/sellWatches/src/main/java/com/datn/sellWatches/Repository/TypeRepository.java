package com.datn.sellWatches.Repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.datn.sellWatches.Entity.Types;

@Repository
public interface TypeRepository extends JpaRepository<Types, String>{
	@Query(value = "SELECT DISTINCT ten_loai FROM loai", nativeQuery = true)
	List<String> getDistinctType();
	
	Optional<Types> findByTenLoai(String tenLoai);
}
