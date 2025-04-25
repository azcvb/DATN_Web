package com.datn.sellWatches.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
	
	@Query(value = "SELECT id, loai, ngay_thanh_toan, so_tien, don_hang_id FROM thanh_toan " +
	        "WHERE (:loai IS NULL OR loai = :loai) " +
	        "AND (:minGia IS NULL OR so_tien >= :minGia) " +
	        "AND (:maxGia IS NULL OR so_tien <= :maxGia) " +
	        "AND ( " +
	        "   (:ngayBatDau IS NULL AND :ngayKetThuc IS NULL) OR " +
	        "   (:ngayBatDau IS NOT NULL AND :ngayKetThuc IS NULL AND ngay_thanh_toan >= :ngayBatDau) OR " +
	        "   (:ngayBatDau IS NULL AND :ngayKetThuc IS NOT NULL AND ngay_thanh_toan <= :ngayKetThuc) OR " +
	        "   (:ngayBatDau IS NOT NULL AND :ngayKetThuc IS NOT NULL AND ngay_thanh_toan BETWEEN :ngayBatDau AND :ngayKetThuc) " +
	        ")",
	        countQuery = "SELECT COUNT(*) FROM thanh_toan " +
	        "WHERE (:loai IS NULL OR loai = :loai) " +
	        "AND (:minGia IS NULL OR so_tien >= :minGia) " +
	        "AND (:maxGia IS NULL OR so_tien <= :maxGia) " +
	        "AND ( " +
	        "   (:ngayBatDau IS NULL AND :ngayKetThuc IS NULL) OR " +
	        "   (:ngayBatDau IS NOT NULL AND :ngayKetThuc IS NULL AND ngay_thanh_toan >= :ngayBatDau) OR " +
	        "   (:ngayBatDau IS NULL AND :ngayKetThuc IS NOT NULL AND ngay_thanh_toan <= :ngayKetThuc) OR " +
	        "   (:ngayBatDau IS NOT NULL AND :ngayKetThuc IS NOT NULL AND ngay_thanh_toan BETWEEN :ngayBatDau AND :ngayKetThuc) " +
	        ")",
	        nativeQuery = true)
	Page<Object[]> getDataTablePayment(
	        @Param("loai") String loai,
	        @Param("minGia") Integer minGia,
	        @Param("maxGia") Integer maxGia,
	        @Param("ngayBatDau") String ngayBatDau,
	        @Param("ngayKetThuc") String ngayKetThuc,
	        Pageable pageable);

}
