package com.datn.sellWatches.DTO.Response.CustomerResponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GetInfoCustomerResponse {
    String soDienThoai;
    String tenKhachHang;
    String diaChi;
    String ngaySinh;
    String gioiTinh;
    String email;
}
