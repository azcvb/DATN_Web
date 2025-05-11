package com.datn.sellWatches.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.datn.sellWatches.DTO.Request.Dashboard.DashboardDayRequest;
import com.datn.sellWatches.DTO.Response.DasboardResponse.DashboardProductResponse;
import com.datn.sellWatches.DTO.Response.DayAndDataResponse;
import com.datn.sellWatches.Repository.ShipRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShipService {
	private final ShipRepository shipRepository;
	
	public DashboardProductResponse dashboardProduct(DashboardDayRequest request) {
		List<Object[]> productSuccess = shipRepository.getShipSuccessDay(request.getStartDay(), request.getEndDay());
		List<Object[]> productReturn = shipRepository.getShipReturnDay(request.getStartDay(), request.getEndDay());
		List<DayAndDataResponse> responseProductSuccess = new ArrayList<>();
		List<DayAndDataResponse> responseProductReturn = new ArrayList<>();
		for(Object[] row : productSuccess ) {
			DayAndDataResponse dto = DayAndDataResponse.builder()
					.day((Date) row[0])
					.data((long) row[1])
					.build();
			responseProductSuccess.add(dto);
		}
		for(Object[] row : productReturn ) {
			DayAndDataResponse dto = DayAndDataResponse.builder()
					.day((Date) row[0])
					.data((long) row[1])
					.build();
			responseProductReturn.add(dto);
		}
		return DashboardProductResponse.builder()
				.productSuccess(responseProductSuccess)
				.productReturn(responseProductReturn)
				.build();
	}
}
