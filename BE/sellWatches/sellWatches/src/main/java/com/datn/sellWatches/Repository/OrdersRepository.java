package com.datn.sellWatches.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.datn.sellWatches.Entity.Order;

@Repository
public interface OrdersRepository extends JpaRepository<Order, String> {
	@Query(value="SELECT DATE(ngay_dat) AS order_day, COUNT(*) AS order_count FROM don_hang "
	        + "WHERE ngay_dat BETWEEN :startDay AND :endDay AND trang_thai = 'ACCEPT'"
	        + "GROUP BY DATE(ngay_dat) "
	        + "ORDER BY order_day ASC", nativeQuery = true)
	List<Object[]> getOrderAccept(@Param("startDay") String startDay, @Param("endDay") String endDay);
	
	@Query(value="SELECT DATE(ngay_dat) AS order_day, COUNT(*) AS order_count FROM don_hang "
	        + "WHERE ngay_dat BETWEEN :startDay AND :endDay AND trang_thai = 'CANCEL'"
	        + "GROUP BY DATE(ngay_dat) "
	        + "ORDER BY order_day ASC", nativeQuery = true)
	List<Object[]> getOrderCancel(@Param("startDay") String startDay, @Param("endDay") String endDay);
}
