package com.datn.sellWatches.DTO.Response.OrderResponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderForTableAdminResponse {
    String id;
    String soDienThoai;
    String gia;
    String ngayDat;
    String mucDich;
    String khac;
    String trangThai;
}
