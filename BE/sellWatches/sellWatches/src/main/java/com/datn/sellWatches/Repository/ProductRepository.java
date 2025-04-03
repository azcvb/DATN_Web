package com.datn.sellWatches.Repository;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.datn.sellWatches.Entity.Products;

@Repository
public interface ProductRepository extends JpaRepository<Products, String> {
	
		@Query(value = "SELECT s.id, s.hinh_anh, s.ten_san_pham, s.ma_san_pham, s.loai_may, s.duong_kinh, s.gia " +
	            "FROM san_pham s " +
	            "JOIN loai_san_pham lsp ON s.id = lsp.san_pham_id " +
	            "JOIN loai l ON lsp.loai_id = l.id " + 
	            "WHERE l.ten_loai = :tenLoai " +
	            "ORDER BY s.ngay_tao DESC",
	    countQuery = "SELECT COUNT(*) FROM san_pham s " +
	            "JOIN loai_san_pham lsp ON s.id = lsp.san_pham_id " +
	            "JOIN loai l ON lsp.loai_id = l.id " + 
	            "WHERE l.ten_loai = :tenLoai",
	    nativeQuery = true)
		Page<Object[]> getProductsInTypeWhereNew(@Param("tenLoai") String tenLoai, Pageable pageable);
		
		@Query(value = "SELECT s.id, s.hinh_anh, s.ten_san_pham, s.ma_san_pham, s.loai_may, s.duong_kinh, s.gia " +
	            "FROM san_pham s " +
	            "JOIN loai_san_pham lsp ON s.id = lsp.san_pham_id " +
	            "JOIN loai l ON lsp.loai_id = l.id " + 
	            "JOIN kho_hang kh ON s.id = kh.san_pham_id " +
	            "WHERE l.ten_loai = :tenLoai " +
	            "ORDER BY kh.da_ban DESC",
	    countQuery = "SELECT COUNT(*) FROM san_pham s " +
	            "JOIN loai_san_pham lsp ON s.id = lsp.san_pham_id " +
	            "JOIN loai l ON lsp.loai_id = l.id " + 
	            "WHERE l.ten_loai = :tenLoai",
	    nativeQuery = true)
		Page<Object[]> getProductsInTypeWhereQuantity(@Param("tenLoai") String tenLoai, Pageable pageable);
		
		@Query(value = "SELECT s.id, s.ma_san_pham, s.ten_san_pham, s.loai_may, s.duong_kinh, s.gia, k.ton_kho, s.hinh_anh " +
	               "FROM san_pham s " +
	               "INNER JOIN kho_hang k ON s.id = k.san_pham_id " +
	               "WHERE s.ten_san_pham LIKE CONCAT('%', :tenSanPham, '%')",
	       countQuery = "SELECT COUNT(*) FROM san_pham s " +
	                    "INNER JOIN kho_hang k ON s.id = k.san_pham_id " +
	                    "WHERE s.ten_san_pham LIKE CONCAT('%', :tenSanPham, '%')",
	       nativeQuery = true)
	Page<Object[]> findTenSanPham(@Param("tenSanPham") String tenSanPham, Pageable pageable);
	
	@Query(value = """
		    SELECT s.id, s.ma_san_pham, s.ten_san_pham, s.loai_may, s.duong_kinh, s.gia, s.hinh_anh 
		    FROM san_pham s
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

	
}
