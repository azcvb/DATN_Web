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
public class GetListProductsHomeResponse {
	String id;
	String hinh_anh;
	String ten_san_pham;
	String ma_san_pham;
	String loai_may;
	float duong_kinh;
	int gia;
}
