package com.datn.sellWatches.DTO.Request.Order;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.repository.query.Param;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderForTableAdminRequest {
    String soDienThoai;
    String ngayBatDau;
    String ngayKetThuc;
    Long minGia;
    Long maxGia;
    String trangThai;
    int page;
}
