package com.datn.sellWatches.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.datn.sellWatches.Entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {
	@Query(value="SELECT DATE(ngay_thanh_toan) AS payment_day, SUM(so_tien) AS total_amount FROM thanh_toan "
	        + "WHERE ngay_thanh_toan BETWEEN :startDay AND :endDay "
	        + "GROUP BY DATE(ngay_thanh_toan) "
	        + "ORDER BY payment_day ASC", nativeQuery = true)
	List<Object[]> getDashboardPayment(@Param("startDay") String startDay, @Param("endDay") String endDay);
	
}
