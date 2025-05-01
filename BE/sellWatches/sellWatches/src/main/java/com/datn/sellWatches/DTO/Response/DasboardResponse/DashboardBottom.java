package com.datn.sellWatches.DTO.Response.DasboardResponse;

import java.util.List;

import com.datn.sellWatches.DTO.Response.PaymentResponse.PaymentDayAndDataResponse;
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
@FieldDefaults(level = AccessLevel.PRIVATE )
public class DashboardBottom {
	List<PaymentDayAndDataResponse> paymentResponse;
}
