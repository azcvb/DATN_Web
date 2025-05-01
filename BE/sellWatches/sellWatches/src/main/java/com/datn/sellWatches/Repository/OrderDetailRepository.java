package com.datn.sellWatches.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.datn.sellWatches.Entity.OrderDetail;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, String>{
    @Query(value = """
            SELECT * FROM chi_tiet_don_hang WHERE don_hang_id = :maDonHang""", nativeQuery = true)
    List<OrderDetail> getOrderDetailForBill(@Param("maDonHang") String maDonHang);
}
