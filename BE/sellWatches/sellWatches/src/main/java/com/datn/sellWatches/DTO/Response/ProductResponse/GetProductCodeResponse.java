package com.datn.sellWatches.DTO.Response.ProductResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GetProductCodeResponse {
    String id;
    String maSanPham;
    int gia;
}
