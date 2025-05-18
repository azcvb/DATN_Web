package com.datn.sellWatches.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

	@Query(value = """
    SELECT id, khach_hang_id, tong_gia, ngay_dat, muc_dich, khac, trang_thai 
    FROM don_hang
    WHERE 
        (:khachHangId IS NULL OR khach_hang_id LIKE CONCAT('%', :khachHangId, '%'))
        AND (
            (:ngayBatDau IS NULL OR :ngayKetThuc IS NULL)
            OR ngay_dat BETWEEN :ngayBatDau AND :ngayKetThuc
        )
        AND (
            (:minGia IS NULL OR :maxGia IS NULL)
            OR tong_gia BETWEEN :minGia AND :maxGia
        )
        AND (:trangThai IS NULL OR trang_thai = :trangThai)
    """,
			countQuery = "SELECT COUNT(*) FROM don_hang",
			nativeQuery = true)
	Page<Object[]> getOrderForTableAdmin(
			@Param("khachHangId") String khachHangId,
			@Param("ngayBatDau") String ngayBatDau,
			@Param("ngayKetThuc") String ngayKetThuc,
			@Param("minGia") Long minGia,
			@Param("maxGia") Long maxGia,
			@Param("trangThai") String trangThai,
			Pageable pageable
	);
}
