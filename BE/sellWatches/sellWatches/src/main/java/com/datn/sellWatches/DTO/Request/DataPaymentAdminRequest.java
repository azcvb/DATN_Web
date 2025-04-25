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
public class DataPaymentAdminRequest {
	String loai;
	Integer minGia;
	Integer maxGia;
	String ngayBatDau;
	String ngayKetThuc;
	int page;
}
