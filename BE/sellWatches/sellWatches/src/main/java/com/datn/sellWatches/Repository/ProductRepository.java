package com.datn.sellWatches.Repository;


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

	
}
