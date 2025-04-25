package com.datn.sellWatches.Repository;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.datn.sellWatches.DTO.Response.GetProductForCar;
import com.datn.sellWatches.Entity.Products;

@Repository
public interface ProductRepository extends JpaRepository<Products, String> {
	
		@Query(value = "SELECT s.id, s.hinh_anh, s.ten_san_pham, s.ma_san_pham, s.loai_may, s.duong_kinh, s.gia " +
	            "FROM san_pham s " +
	            "JOIN loai l ON s.loai_id = l.id " + 
	            "WHERE l.ten_loai = :tenLoai " +
	            "ORDER BY s.ngay_tao DESC",
	    countQuery = "SELECT COUNT(*) FROM san_pham s " +
	            "JOIN loai l ON s.loai_id = l.id " + 
	            "WHERE l.ten_loai = :tenLoai",
	    nativeQuery = true)
		Page<Object[]> getProductsInTypeWhereNew(@Param("tenLoai") String tenLoai, Pageable pageable);
		
		@Query(value = "SELECT s.id, s.hinh_anh, s.ten_san_pham, s.ma_san_pham, s.loai_may, s.duong_kinh, s.gia " +
	            "FROM san_pham s " +
	            "JOIN loai l ON s.loai_id = l.id " + 
	            "JOIN kho_hang kh ON s.id = kh.san_pham_id " +
	            "WHERE l.ten_loai = :tenLoai " +
	            "ORDER BY s.ngay_tao DESC",
	    countQuery = "SELECT COUNT(*) FROM san_pham s " +
	            "JOIN loai l ON s.loai_id = l.id " + 
	            "WHERE l.ten_loai = :tenLoai",
	    nativeQuery = true)
		Page<Object[]> getProductsInTypeWhereQuantity(@Param("tenLoai") String tenLoai, Pageable pageable);
		
		@Query(value = "SELECT s.id, s.ma_san_pham, s.ten_san_pham, s.loai_may, s.duong_kinh, s.gia, s.hinh_anh, l.ten_loai  " +
	               "FROM san_pham s " +
	               "JOIN loai l ON s.loai_id = l.id " +
	               "WHERE s.ten_san_pham LIKE CONCAT('%', :tenSanPham, '%')",
	       countQuery = "SELECT COUNT(*) FROM san_pham s " +
	                    "JOIN loai l ON s.loai_id = l.id " +
	                    "WHERE s.ten_san_pham LIKE CONCAT('%', :tenSanPham, '%')",
	       nativeQuery = true)
	Page<Object[]> findTenSanPham(@Param("tenSanPham") String tenSanPham, Pageable pageable);
	
	@Query(value = """
		    SELECT s.id, s.ma_san_pham, s.ten_san_pham, s.loai_may, s.duong_kinh, s.gia, s.hinh_anh, l.ten_loai 
		    FROM san_pham s
		    JOIN loai l ON s.loai_id = l.id 
		    WHERE (:tenSanPham IS NULL OR s.ten_san_pham LIKE CONCAT('%', :tenSanPham, '%')) 
		    AND (:gioiTinh IS NULL OR s.gioi_tinh = :gioiTinh)
		    AND (:thuongHieu IS NULL OR s.thuong_hieu = :thuongHieu)
		    AND (:minGia IS NULL OR s.gia >= :minGia) 
		    AND (:maxGia IS NULL OR s.gia <= :maxGia) 
		    AND (:loaiMay IS NULL OR s.loai_may = :loaiMay) 
		    AND (:minDuongKinh IS NULL OR s.duong_kinh >= :minDuongKinh) 
		    AND (:maxDuongKinh IS NULL OR s.duong_kinh <= :maxDuongKinh)
		    AND (:chatLieuDay IS NULL OR s.chat_lieu_day = :chatLieuDay)
		    AND (:chatLieuVo IS NULL OR s.chat_lieu_vo = :chatLieuVo)
		    AND (:matKinh IS NULL OR s.mat_kinh = :matKinh)
		    AND (:mauMat IS NULL OR s.mau_mat = :mauMat)
		    AND (:phongCach IS NULL OR s.phong_cach = :phongCach)
		    AND (:kieuDang IS NULL OR s.kieu_dang = :kieuDang)
		    AND (:xuatXu IS NULL OR s.xuat_xu = :xuatXu)
		""", nativeQuery = true)
		Page<Object[]> filterProducts(
		        @Param("tenSanPham") String tenSanPham,
		        @Param("gioiTinh") String gioiTinh,
		        @Param("thuongHieu") String thuongHieu,
		        @Param("minGia") Integer minGia,
		        @Param("maxGia") Integer maxGia,
		        @Param("loaiMay") String loaiMay,
		        @Param("minDuongKinh") Float minDuongKinh,
		        @Param("maxDuongKinh") Float maxDuongKinh,
		        @Param("chatLieuDay") String chatLieuDay,
		        @Param("chatLieuVo") String chatLieuVo,
		        @Param("matKinh") String matKinh,
		        @Param("mauMat") String mauMat,
		        @Param("phongCach") String phongCach,
		        @Param("kieuDang") String kieuDang,
		        @Param("xuatXu") String xuatXu,
		        Pageable pageable);
		@Query(value = "SELECT s.id, s.ma_san_pham, s.ten_san_pham, s.gia, l.ten_loai, k.ton_kho, k.da_ban, s.ngay_tao FROM san_pham s "
				+ "JOIN loai l ON s.loai_id = l.id "
				+ "JOIN kho_hang k ON s.id = k.san_pham_id "
				+ "WHERE (:tenSanPham IS NULL OR s.ten_san_pham LIKE CONCAT('%', :tenSanPham, '%')) "
				+ "AND (:loaiSanPham IS NULL OR l.ten_loai = :loaiSanPham) "
				+ "AND (:minGia IS NULL OR s.gia >= :minGia) "
				+ "AND (:maxGia IS NULL OR  s.gia <= :maxGia) "
				+ "AND (:tonKho IS NULL OR k.ton_kho = 0) "
				+ "AND (:loai IS NULL OR l.ten_loai = :loai) "
				+ "AND (:ngayBatDau IS NULL OR :ngayKetThuc IS NULL OR s.ngay_tao BETWEEN :ngayBatDau AND :ngayKetThuc)", nativeQuery = true)
		Page<Object[]> filterProductAdmin(
				 @Param("tenSanPham") String tenSanPham,
				 @Param("loaiSanPham") String loaiSanPham,
				 @Param("minGia") Integer minGia,
			     @Param("maxGia") Integer maxGia,
			     @Param("loai") String loai,
			     @Param("tonKho") String tonKho,
			     @Param("ngayBatDau") String ngayBatDau,
			     @Param("ngayKetThuc") String ngayKetThuc,
			     Pageable pageable);
	
		@Query(value = "SELECT s.id, s.ma_san_pham, s.ten_san_pham, s.gia, s.hinh_anh FROM san_pham s "
				+ "WHERE s.id = :id", nativeQuery = true)
		List<Object[]> getProductForCar(@Param("id") String id);
		
		@Query(value = "SELECT s.id, s.ma_san_pham, s.ten_san_pham, s.gia, s.mo_ta, s.loai_may, s.mat_kinh, s.chat_lieu_vo, s.chat_lieu_day, s.mau_mat, "
				+ "s.xuat_xu, s.kieu_dang, s.phong_cach, s.duong_kinh, s.do_day, s.khang_nuoc, s.bao_hanh_hang, s.bao_hanh_shop, s.hinh_anh, s.khac, "
				+ "s.thuong_hieu, s.gioi_tinh, k.ton_kho, l.ten_loai FROM san_pham s "
				+ "JOIN kho_hang k ON k.san_pham_id = s.id "
				+ "JOIN loai l ON s.loai_id = l.id "
				+ "WHERE s.id = :id", nativeQuery = true)
		Object getProductTableAdmin(@Param("id") String id);
}
