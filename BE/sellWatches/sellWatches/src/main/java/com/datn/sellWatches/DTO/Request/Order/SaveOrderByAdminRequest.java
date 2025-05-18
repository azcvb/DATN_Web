package com.datn.sellWatches.DTO.Request.Order;

import com.datn.sellWatches.DTO.Request.Product.ProductOrderByAdminRequest;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SaveOrderByAdminRequest {
    String soDienThoai;
    String tenKhachHang;
    String ngaySinh;
    String diaChi;
    List<ProductOrderByAdminRequest> sanPham;
    String trangThai;
    String thanhToan;
    String sum;
    String mucDich;
    String khac;
}
