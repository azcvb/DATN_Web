package com.datn.sellWatches.DTO.Request.Product;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductOrderByAdminRequest {
    String maSanPham;
    String gia;
    String soLuong;
}
