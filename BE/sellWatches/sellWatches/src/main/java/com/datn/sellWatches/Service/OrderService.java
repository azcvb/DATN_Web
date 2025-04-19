package com.datn.sellWatches.Service;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.datn.sellWatches.DTO.Request.DashboardDayRequest;
import com.datn.sellWatches.DTO.Request.OrderRequest;
import com.datn.sellWatches.DTO.Request.SaveCustomerRequest;
import com.datn.sellWatches.DTO.Request.SaveOrderDetailRequest;
import com.datn.sellWatches.DTO.Request.SaveOrderRequest;
import com.datn.sellWatches.DTO.Response.DashboardOrderResponse;
import com.datn.sellWatches.DTO.Response.DashboardProductResponse;
import com.datn.sellWatches.DTO.Response.DayAndDataResponse;
import com.datn.sellWatches.DTO.Response.SaveCustomerResponse;
import com.datn.sellWatches.DTO.Response.SaveOrderResponse;
import com.datn.sellWatches.Entity.Customer;
import com.datn.sellWatches.Entity.Order;
import com.datn.sellWatches.Entity.Order.StatusOrder;
import com.datn.sellWatches.Exception.AppException;
import com.datn.sellWatches.Exception.ErrorCode;
import com.datn.sellWatches.Repository.CustomerRepository;
import com.datn.sellWatches.Repository.OrdersRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {
	 private final OrdersRepository ordersRepository;
	 private final CustomerRepository customerRepository;
	 private final OrderDetailService orderDetailService;
	 private final CustomerService customerService;
	 private final PaymentService paymentService;


	 @Transactional
	    public SaveOrderResponse order(OrderRequest request) {
	        SaveCustomerRequest customerRequest = request.getCustomerRequest();
	        SaveOrderRequest orderRequest = request.getOrderRequest();
	        List<SaveOrderDetailRequest> orderDetailRequest = request.getOrderDetailRequest();

	        SaveCustomerResponse customerResponse;
	        Customer customer;
	        Order order;
	        StatusOrder statusOrder = StatusOrder.PENDING;
	        if(orderRequest.getLoai_thanh_toan().equals("Thanh toán online")) {
	        	statusOrder = StatusOrder.ACCEPT;
	        }

	        customer = customerRepository.findById(customerRequest.getSo_dien_thoai()).orElse(null);
	        if (customer == null || customer.getSoDienThoai() == null) {
	            try {
	                customerResponse = customerService.saveCustomerByOrder(customerRequest);
	                customer = customerResponse.getCustomer();
	            } catch (Exception err) {
	                log.info(err.toString());
	                return SaveOrderResponse.builder()
	                        .isOrder(false)
	                        .errBy("saveCustomerByOrder")
	                        .build();
	            }
	        }

	        try {
	            order = Order.builder()
	                    .ngay_dat(LocalDateTime.now())
	                    .tong_gia(orderRequest.getTong_gia())
	                    .khach_hang(customer)
	                    .muc_dich(orderRequest.getMuc_dich())
	                    .khac(orderRequest.getKhac())
	                    .trang_thai(statusOrder)
	                    .build();
	            ordersRepository.save(order);
	        } catch (Exception e) {
	            log.info(e.toString());
	            return SaveOrderResponse.builder()
	                    .isOrder(false)
	                    .errBy("saveOrder")
	                    .build();
	        }

	        try {
	            orderDetailService.saveOrderDetailByOrder(orderDetailRequest, order.getId());
	        } catch (Exception e) {
	            log.info(e.toString());
	            return SaveOrderResponse.builder()
	                    .isOrder(false)
	                    .errBy("saveOrderDetailByOrder")
	                    .build();
	        }
	        try {
	        	paymentService.savePayment(orderRequest.getLoai_thanh_toan(), orderRequest.getTong_gia(), order);
	        }catch (Exception e) {
	            log.info(e.toString());
	            return SaveOrderResponse.builder()
	                    .isOrder(false)
	                    .errBy("savePayment")
	                    .build();
	        }
	        log.info("thanhToan");
	        return SaveOrderResponse.builder()
	                .isOrder(true)
	                .build();
	    }
	 public DashboardOrderResponse dashboardOrder(DashboardDayRequest request) {
			List<Object[]> orderAccept = ordersRepository.getOrderAccept(request.getStartDay(), request.getEndDay());
			List<Object[]> orderCancel = ordersRepository.getOrderCancel(request.getStartDay(), request.getEndDay());
			List<DayAndDataResponse> responseOrderAccept = new ArrayList<>();
			List<DayAndDataResponse> responseOrderCancel = new ArrayList<>();
			for(Object[] row : orderAccept ) {
				DayAndDataResponse dto = DayAndDataResponse.builder()
						.day((Date) row[0])
						.data((long) row[1])
						.build();
				responseOrderAccept.add(dto);
			}
			for(Object[] row : orderCancel ) {
				DayAndDataResponse dto = DayAndDataResponse.builder()
						.day((Date) row[0])
						.data((long) row[1])
						.build();
				responseOrderCancel.add(dto);
			}
			return DashboardOrderResponse.builder()
					.orderAccept(responseOrderAccept)
					.orderCancel(responseOrderCancel)
					.build();
		}
	 
}
