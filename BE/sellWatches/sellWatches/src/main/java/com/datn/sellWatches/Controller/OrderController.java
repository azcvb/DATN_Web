package com.datn.sellWatches.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.datn.sellWatches.DTO.Request.OrderRequest;
import com.datn.sellWatches.DTO.Response.ApiResponse;
import com.datn.sellWatches.DTO.Response.SaveOrderResponse;
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
		log.info(request.toString());
		SaveOrderResponse result = orderService.order(request);
		return ApiResponse.<SaveOrderResponse>builder()
				.result(result)
				.build();
	}
}
