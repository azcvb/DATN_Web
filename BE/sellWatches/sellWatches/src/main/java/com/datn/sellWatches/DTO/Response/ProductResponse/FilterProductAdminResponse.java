package com.datn.sellWatches.DTO.Response.ProductResponse;

import java.sql.Date;

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
public class FilterProductAdminResponse {
	String id;
	String tenSanPham;
	String maSanPham;
	Integer gia;
	String loai;
	Integer tonKho;
	Integer daBan;
	Date ngayTao;
	String tenLoai;
}
