package com.datn.sellWatches.DTO.Request;

import java.time.LocalDate;

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
public class AddProductRequest {
	String maSanPham;
	String tenSanPham;
	Integer gia;
	String moTa;
	String loaiMay;
	String matKinh;
	String chatLieuVo;
	String chatLieuDay;
	String mauMat;
	String xuatXu;
	String kieuDang;
	String phongCach;
	Float duongKinh;
	Float doDay;
	String khangNuoc;
	String baoHanhHang;
	String baoHanhShop;
	String hinhAnh;
	LocalDate ngayTao;
	String khac;
	String thuongHieu;
	String gioiTinh;
	Integer soLuong;
	String loaiSanPham;
}
