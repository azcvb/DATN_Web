package com.datn.sellWatches.DTO.Response;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
public class GetProductByIdResponse {
	String id;
	String ma_san_pham;
	String ten_san_pham;
	int gia;
	String mo_ta;
	String loai_may;
	String mat_kinh;
	String chat_lieu_vo;
	String chat_lieu_day;
	String mau_mat;
	String xuat_xu;
	String kieu_dang;
	String phong_cach;
	float duong_kinh;
	float do_day;
	String khang_nuoc;
	String bao_hanh_hang;
	String bao_hanh_shop;
	String hinh_anh;
	LocalDate ngay_tao;
	String khac;
	Types loai;

}
