package com.datn.sellWatches.DTO.Request.Product;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FilterProductsRequest {
	String tenSanPham;
	String gioiTinh;
	String thuongHieu;
	Integer minGia;
	Integer maxGia;
	String loaiMay;
	Float minDuongKinh;
	Float maxDuongKinh;
	String chatLieuDay;
	String chatLieuVo;
	String matKinh;
	String mauMat;
	String phongCach;
	String kieuDang;
	String xuatXu;
	int page;
}
