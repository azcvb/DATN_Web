package com.datn.sellWatches.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.datn.sellWatches.Entity.Ship;

@Repository
public interface ShipRepository extends JpaRepository<Ship, String> {
		
	@Query(value = "SELECT DATE(ngay_van_chuyen) AS order_day,COUNT(*) AS order_count FROM van_chuyen"
			+ " WHERE ngay_van_chuyen BETWEEN :startDay AND :endDay AND trang_thai = 'SUCCESS'"
			+ " GROUP BY DATE(ngay_van_chuyen)"
			+ " ORDER BY order_day ASC;", nativeQuery = true)
	List<Object[]> getShipSuccessDay(@Param("startDay") String startDay,@Param("endDay") String endDay);
	
	@Query(value = "SELECT DATE(ngay_van_chuyen) AS order_day,COUNT(*) AS order_count FROM van_chuyen"
			+ " WHERE ngay_van_chuyen BETWEEN :startDay AND :endDay AND trang_thai = 'RETURN'"
			+ " GROUP BY DATE(ngay_van_chuyen)"
			+ " ORDER BY order_day ASC;", nativeQuery = true)
	List<Object[]> getShipReturnDay(@Param("startDay") String startDay,@Param("endDay") String endDay);
}
