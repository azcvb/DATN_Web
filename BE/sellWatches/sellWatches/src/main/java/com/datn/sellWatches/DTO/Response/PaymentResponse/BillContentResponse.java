package com.datn.sellWatches.DTO.Response.PaymentResponse;

import com.datn.sellWatches.DTO.Response.OrderDetailResponse.OrderDetailResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BillContentResponse {
    String maDonHang;
    String tenKhachHang;
    String soDienThoai;
    String diaChi;
    LocalDate ngay;
    String loaiThanhToan;
    List<OrderDetailResponse> orderDetailResponseList;
}
