package com.datn.sellWatches.DTO.Response.OrderDetailResponse;

import com.datn.sellWatches.Entity.OrderDetail;
import com.datn.sellWatches.Entity.Products;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetailResponse {
    String sanPhamId;
    String maSanPham;
    String tenSanPham;
    String loaiSanPham;
    int soLuong;
    int gia;
}
