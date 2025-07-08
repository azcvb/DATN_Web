package com.datn.sellWatches.DTO.Response.OrderResponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderHistoryResponse {
    String id;
    String tongGia;
    String ngayDat;
    String trangThai;
    String diaChi;
    String loadThanhToan;
    List<GetProductForHistoryResponse> sanShams;
}
