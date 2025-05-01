package com.datn.sellWatches.DTO.Response.ProductResponse;

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
public class FilterProductsResponse {
	String id;
	String ma_san_pham;
	String ten_san_pham;
	String loai_may;
	Float duong_kinh;
	Integer gia;
	String hinh_anh;
	String loai;
}
