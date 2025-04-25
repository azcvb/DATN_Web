package com.datn.sellWatches.DTO.Response;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
public class DataPaymentAdminResponse {
	String id;
	String loai;
	Long gia;
	LocalDate ngayThanhToan;
	String maDonHang;
}
