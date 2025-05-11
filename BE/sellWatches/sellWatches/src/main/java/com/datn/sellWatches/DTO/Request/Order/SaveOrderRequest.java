package com.datn.sellWatches.DTO.Request.Order;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SaveOrderRequest {
	long tong_gia;
	String muc_dich;
	String khac;
	String loai_thanh_toan;
}
