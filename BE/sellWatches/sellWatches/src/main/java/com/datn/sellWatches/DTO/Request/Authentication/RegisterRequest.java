package com.datn.sellWatches.DTO.Request.Authentication;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterRequest {
    String tenNguoiDung;
    String matKhau;
    String email;
    String ngaySinh;
    String gioiTinh;
    String soDienThoai;
}
