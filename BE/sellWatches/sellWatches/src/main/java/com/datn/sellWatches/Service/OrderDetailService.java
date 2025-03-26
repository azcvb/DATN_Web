package com.datn.sellWatches.Service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.datn.sellWatches.DTO.Request.SaveOrderDetailRequest;
import com.datn.sellWatches.Entity.Order;
import com.datn.sellWatches.Entity.OrderDetail;
import com.datn.sellWatches.Entity.Products;
import com.datn.sellWatches.Exception.AppException;
import com.datn.sellWatches.Exception.ErrorCode;
import com.datn.sellWatches.Repository.OrderDetailRepository;
import com.datn.sellWatches.Repository.OrdersRepository;
import com.datn.sellWatches.Repository.ProductRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderDetailService {
	private final OrderDetailRepository orderDetailRepository;
	private final ProductRepository productRepository;
	private final OrdersRepository ordersRepository;
	
	public boolean saveOrderDetailByOrder(List<SaveOrderDetailRequest> requests, String don_hang_id) {
		boolean isOrderDetail = false;
		
		Order order = ordersRepository.findById(don_hang_id)
				.orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXIT));
		try {
	        for (SaveOrderDetailRequest request : requests) {
	            Products products = productRepository.findById(request.getSan_pham_id())
	                    .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXIT));

	            OrderDetail orderDetail = OrderDetail.builder()
	                    .so_luong(request.getSo_luong())
	                    .gia(request.getGia())
	                    .san_pham(products)
	                    .don_hang(order)
	                    .build();

	            orderDetailRepository.save(orderDetail);
	        }
	        isOrderDetail = true;
	    } catch (Exception e) {
	        log.info(e.toString());
	    }

	    return isOrderDetail;
	}
}
