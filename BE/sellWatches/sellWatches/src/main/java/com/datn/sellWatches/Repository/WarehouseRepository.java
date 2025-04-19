package com.datn.sellWatches.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.datn.sellWatches.Entity.Warehouse;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, String>{
	
}
