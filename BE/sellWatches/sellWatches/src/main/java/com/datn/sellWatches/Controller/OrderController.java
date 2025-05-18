package com.datn.sellWatches.Controller;

import com.datn.sellWatches.DTO.Request.Order.OrderForTableAdminRequest;
import com.datn.sellWatches.DTO.Request.Order.SaveOrderByAdminRequest;
import com.datn.sellWatches.DTO.Request.Order.UpdateStatusOrderRequest;
import com.datn.sellWatches.DTO.Request.StringRequest;
import com.datn.sellWatches.DTO.Response.OrderResponse.ListOrderForTableAdminResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.datn.sellWatches.DTO.Request.Order.OrderRequest;
import com.datn.sellWatches.DTO.Response.ApiResponse;
import com.datn.sellWatches.DTO.Response.OrderResponse.SaveOrderResponse;
import com.datn.sellWatches.Service.OrderService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/order")
@Slf4j
public class OrderController {
	@Autowired
	OrderService orderService;
	
	@PostMapping()
	public ApiResponse<SaveOrderResponse> saveOrder(@RequestBody OrderRequest request) {
		SaveOrderResponse result = orderService.order(request);
		return ApiResponse.<SaveOrderResponse>builder()
				.result(result)
				.build();
	}
	@PostMapping("/tableAdmin")
	public ApiResponse<ListOrderForTableAdminResponse> tableAdmin(@RequestBody OrderForTableAdminRequest request) {
		ListOrderForTableAdminResponse result = orderService.orderForTableAdmin(request);
		return  ApiResponse.<ListOrderForTableAdminResponse>builder()
				.result(result)
				.build();
	}
	@PostMapping("/updateStatusOrder")
	public ApiResponse<Boolean> updateStatusOrder(@RequestBody UpdateStatusOrderRequest request) {
		Boolean result = orderService.updateStatusOrder(request);
		return ApiResponse.<Boolean>builder()
				.result(result)
				.build();
	}
	@PostMapping("/savaOrderByAdmin")
	public ApiResponse<SaveOrderResponse> saveOrderByAdmin(@RequestBody SaveOrderByAdminRequest request) {
		SaveOrderResponse result = orderService.saveOrderByAdmin(request);
		return ApiResponse.<SaveOrderResponse>builder()
				.result(result)
				.build();
	}
}
