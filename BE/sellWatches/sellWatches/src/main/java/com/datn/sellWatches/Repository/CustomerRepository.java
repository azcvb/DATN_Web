package com.datn.sellWatches.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.datn.sellWatches.Entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
	
	Customer findBySoDienThoai(String soDienThoai);
	
	@Query(value="SELECT DATE(ngay_tao) AS customer_day, COUNT(*) AS customer_count FROM khach_hang "
	        + "WHERE ngay_tao BETWEEN :startDay AND :endDay "
	        + "GROUP BY DATE(ngay_tao) "
	        + "ORDER BY customer_day ASC", nativeQuery = true)
	List<Object[]> getNewCustomer(@Param("startDay") String startDay, @Param("endDay") String endDay);

}
