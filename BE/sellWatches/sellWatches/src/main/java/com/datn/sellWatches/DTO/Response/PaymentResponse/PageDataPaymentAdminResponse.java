package com.datn.sellWatches.DTO.Response.PaymentResponse;

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
public class PageDataPaymentAdminResponse {
	List<DataPaymentAdminResponse> dataPaymentAdminResponses;
	int totalPage;
}
