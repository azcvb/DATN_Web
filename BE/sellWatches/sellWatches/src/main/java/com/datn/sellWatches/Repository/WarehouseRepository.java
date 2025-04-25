package com.datn.sellWatches.Repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.datn.sellWatches.Entity.Warehouse;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, String>{
	@Query(value = "SELECT SUM(gia_nhap) AS giaBan FROM kho_hang WHERE ngay_nhap BETWEEN :startDay AND :endDay", nativeQuery = true)
	BigDecimal  getImportPrice(@Param("startDay") String startDay,@Param("endDay") String endDay);	
	
	@Query(value = "SELECT k.da_ban, s.gia FROM kho_hang k "
			+ "JOIN san_pham s ON k.san_pham_id = s.id "
			+ "WHERE ngay_nhap BETWEEN :startDay AND :endDay", nativeQuery = true)
	List<Object[]> getQuantitySellProduct(@Param("startDay") String startDay,@Param("endDay") String endDay);	
	
	@Query(value = 
		    "SELECT k.id, k.ton_kho, k.ngay_nhap, k.san_pham_id, k.gia_nhap, k.ghi_chu, k.da_ban " +  
		    "FROM kho_hang k " +
		    "WHERE k.san_pham_id = :productId " +
		    "ORDER BY k.ngay_nhap DESC",
		    nativeQuery = true)
		List<Warehouse> getWarehousesWithProduct(@Param("productId") String productId);
}
