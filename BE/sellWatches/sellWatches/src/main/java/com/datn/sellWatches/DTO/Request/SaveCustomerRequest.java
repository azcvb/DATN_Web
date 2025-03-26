package com.datn.sellWatches.DTO.Request;

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
public class SaveCustomerRequest {
	String so_dien_thoai;
	String ten_khach_hang;
	String email;
	String dia_chi;
	String ngay_sinh;
}
