package com.datn.sellWatches.DTO.Response.PaymentResponse;

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
public class DataPaymentAdminResponse {
	String id;
	String loai;
	Long gia;
	LocalDate ngayThanhToan;
	String maDonHang;
}
