package com.datn.sellWatches.Service;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.datn.sellWatches.DTO.Request.DashboardDayRequest;
import com.datn.sellWatches.DTO.Response.DasboardResponse.DashboardProductSell;
import com.datn.sellWatches.DTO.Response.DasboardResponse.DashboardRevenueTopResponse;
import com.datn.sellWatches.Repository.WarehouseRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class WarehouseService {
	final WarehouseRepository warehouseRepository;
	
	public DashboardRevenueTopResponse DashboardRevenueTop(DashboardDayRequest request) {
		BigDecimal giaNhap = warehouseRepository.getImportPrice(request.getStartDay(), request.getEndDay());
		List<Object[] > productSell = warehouseRepository.getQuantitySellProduct(request.getStartDay(), request.getEndDay());
		List<DashboardProductSell> listProductSell = new ArrayList<>();
		
		for(Object[] row : productSell) {
			DashboardProductSell dto = DashboardProductSell.builder()
					.soLuong((Integer) row[0])
					.giaBan((Integer) row[1])
					.build();
			listProductSell.add(dto);
		}
		return DashboardRevenueTopResponse.builder()
				.giaNhap(giaNhap)
				.productSell(listProductSell)
				.build();
	};
}
