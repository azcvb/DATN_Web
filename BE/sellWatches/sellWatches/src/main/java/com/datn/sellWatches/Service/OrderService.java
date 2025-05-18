package com.datn.sellWatches.Service;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.datn.sellWatches.ComponentFunction.ComponentFun;
import com.datn.sellWatches.DTO.Request.Order.*;
import com.datn.sellWatches.DTO.Request.Product.ProductOrderByAdminRequest;
import com.datn.sellWatches.DTO.Request.StringRequest;
import com.datn.sellWatches.DTO.Response.OrderResponse.ListOrderForTableAdminResponse;
import com.datn.sellWatches.DTO.Response.OrderResponse.OrderForTableAdminResponse;
import com.datn.sellWatches.Entity.Products;
import com.datn.sellWatches.Repository.ProductRepository;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.datn.sellWatches.DTO.Request.Dashboard.DashboardDayRequest;
import com.datn.sellWatches.DTO.Request.Customer.SaveCustomerRequest;
import com.datn.sellWatches.DTO.Response.DasboardResponse.DashboardOrderResponse;
import com.datn.sellWatches.DTO.Response.DayAndDataResponse;
import com.datn.sellWatches.DTO.Response.CustomerResponse.SaveCustomerResponse;
import com.datn.sellWatches.DTO.Response.OrderResponse.SaveOrderResponse;
import com.datn.sellWatches.Entity.Customer;
import com.datn.sellWatches.Entity.Order;
import com.datn.sellWatches.Entity.Order.StatusOrder;
import com.datn.sellWatches.Entity.Warehouse;
import com.datn.sellWatches.Exception.AppException;
import com.datn.sellWatches.Exception.ErrorCode;
import com.datn.sellWatches.Repository.CustomerRepository;
import com.datn.sellWatches.Repository.OrdersRepository;
import com.datn.sellWatches.Repository.WarehouseRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {
	 private final OrdersRepository ordersRepository;
	 private final ProductRepository productRepository;
	 private final CustomerRepository customerRepository;
	 private final OrderDetailService orderDetailService;
	 private final CustomerService customerService;
	 private final PaymentService paymentService;
	 private final WarehouseRepository warehouseRepository;
	private  final ComponentFun componentFun;
	 @Transactional
	    public SaveOrderResponse order(OrderRequest request) {
	        SaveCustomerRequest customerRequest = request.getCustomerRequest();
	        SaveOrderRequest orderRequest = request.getOrderRequest();
	        List<SaveOrderDetailRequest> orderDetailRequest = request.getOrderDetailRequest();

	        SaveCustomerResponse customerResponse;
	        Customer customer;
	        Order order;
	        StatusOrder statusOrder = StatusOrder.PENDING;

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
	        try {
	        	for(SaveOrderDetailRequest dto : orderDetailRequest) { 
	        		int soLuong = dto.getSo_luong();
	        		List<Warehouse> warehouses = warehouseRepository.getWarehousesWithProduct(dto.getSan_pham_id());
	        		for(Warehouse warehouse : warehouses) {
	        			if(warehouse.getTon_kho() > 0) {
	        				Warehouse newWarehouse = warehouseRepository.findById(warehouse.getId())
	        						.orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXIT));
	        				int tonKho = newWarehouse.getTon_kho();
	        				int daBan = newWarehouse.getDa_ban();
	        				if(tonKho >= soLuong) {
		        				newWarehouse.setTon_kho(tonKho - soLuong);
		        				newWarehouse.setDa_ban(daBan + soLuong);
		        				warehouseRepository.save(newWarehouse);
		        				break;
		        				
	        				}else {
	        					soLuong -= tonKho;
	        					newWarehouse.setTon_kho(0);
	        					newWarehouse.setDa_ban(daBan + tonKho);
	        					warehouseRepository.save(newWarehouse);
	        				}
	        				
	        			}
	        		}
	        	}
	        }catch (Exception e) {
	            log.info(e.toString());
	            return SaveOrderResponse.builder()
	                    .isOrder(false)
	                    .errBy("saveWarehouse")
	                    .build();
	        }
	        return SaveOrderResponse.builder()
					.orderId(order.getId())
	                .isOrder(true)
	                .build();
	    }

	@Transactional
	@PreAuthorize("hasRole('ADMIN')")
	public SaveOrderResponse saveOrderByAdmin(SaveOrderByAdminRequest request) {
		 int tongGia = Integer.parseInt(request.getSum().replaceAll("\\.", ""));
		SaveOrderRequest saveOrderRequest = SaveOrderRequest.builder()
				.tong_gia(tongGia)
				.muc_dich(request.getMucDich())
				.khac(request.getKhac())
				.loai_thanh_toan(request.getThanhToan())
				.build();
		SaveCustomerRequest customerRequest = SaveCustomerRequest.builder()
				.gioi_tinh("")
				.email("")
				.ngay_sinh(request.getNgaySinh())
				.ten_khach_hang(request.getTenKhachHang())
				.dia_chi(request.getDiaChi())
				.so_dien_thoai(request.getSoDienThoai())
				.build();
		List<SaveOrderDetailRequest> orderDetailRequest = new ArrayList<>();
		for(ProductOrderByAdminRequest item : request.getSanPham()) {
			Products products = productRepository.getProductCode(item.getMaSanPham()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXIT));
			int gia = Integer.parseInt(item.getGia().replaceAll("\\.", ""));
			SaveOrderDetailRequest dto = SaveOrderDetailRequest.builder()
					.san_pham_id(products.getId())
					.gia(gia)
					.so_luong(Integer.parseInt(item.getSoLuong()))
					.build();
			orderDetailRequest.add(dto);
		}
		OrderRequest orderRequest = OrderRequest.builder()
				.orderRequest(saveOrderRequest)
				.customerRequest(customerRequest)
				.orderDetailRequest(orderDetailRequest)
				.build();
        return order(orderRequest);
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
	@PreAuthorize("hasRole('ADMIN')")
	public ListOrderForTableAdminResponse orderForTableAdmin(OrderForTableAdminRequest request) {
		Pageable pageable = PageRequest.of(request.getPage(), 10);
		List<OrderForTableAdminResponse> orderForTableAdminResponses = new ArrayList<>();

		Page<Object[]> pages = ordersRepository.getOrderForTableAdmin(
				request.getSoDienThoai(),
				request.getNgayBatDau(),
				request.getNgayKetThuc(),
				request.getMinGia(),
				request.getMaxGia(),
				request.getTrangThai(),
				pageable);
		int totalPages = pages.getTotalPages() - 1;
		for (Object[] row : pages) {
			OrderForTableAdminResponse dto = OrderForTableAdminResponse.builder()
					.id(componentFun.safeToString(row[0]))
					.soDienThoai(componentFun.safeToString(row[1]))
					.gia(componentFun.safeToString(row[2]))
					.ngayDat(componentFun.safeToString(row[3]))
					.mucDich(componentFun.safeToString(row[4]))
					.khac(componentFun.safeToString(row[5]))
					.trangThai(componentFun.safeToString(row[6]))
					.build();
			orderForTableAdminResponses.add(dto);
		}
		return ListOrderForTableAdminResponse.builder()
				.orderForTableAdminResponses(orderForTableAdminResponses)
				.totalPage(totalPages)
				.build();
	}
	@Transactional
	public Boolean updateStatusOrder(UpdateStatusOrderRequest request) {
		 try{
			log.info(request.getOrderId());
			 Order order = ordersRepository.findById(request.getOrderId())
					 .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXIT));
			 order.setTrang_thai(request.getStatus() ? StatusOrder.ACCEPT : StatusOrder.CANCEL);
		 }catch(Exception e) {
			 log.info(e.toString());
			 return false;
		 }
		 return true;
	}
}
