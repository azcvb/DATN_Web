package com.datn.sellWatches.DTO.Request;

import java.time.LocalDate;
import com.datn.sellWatches.Entity.Types;

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
public class UpdateProductRequest {
	String id;
	String maSanPham;
	String tenSanPham;
	int gia;
	String moTa;
	String loaiMay;
	String matKinh;
	String chatLieuVo;
	String chatLieuDay;
	String mauMat;
	String xuatXu;
	String kieuDang;
	String phongCach;
	float duongKinh;
	float doDay;
	String khangNuoc;
	String baoHanhHang;
	String baoHanhShop;
	String hinhAnh;
	LocalDate ngayTao;
	String khac;
	String loaiSanPham;
}

