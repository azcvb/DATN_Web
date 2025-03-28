package com.datn.sellWatches.DTO.Request;

import java.util.List;

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
public class OrderRequest {
	SaveOrderRequest orderRequest;
	SaveCustomerRequest customerRequest;
	List<SaveOrderDetailRequest> orderDetailRequest;
}
