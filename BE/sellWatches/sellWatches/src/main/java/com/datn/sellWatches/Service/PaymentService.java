package com.datn.sellWatches.Service;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.TreeMap;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.datn.sellWatches.Configuration.ConfigPayment;
import com.datn.sellWatches.DTO.Request.DashboardDayRequest;
import com.datn.sellWatches.DTO.Request.DataPaymentAdminRequest;
import com.datn.sellWatches.DTO.Request.PaymentReturnRequest;
import com.datn.sellWatches.DTO.Response.DashboardBottom;
import com.datn.sellWatches.DTO.Response.DataPaymentAdminResponse;
import com.datn.sellWatches.DTO.Response.PageDataPaymentAdminResponse;
import com.datn.sellWatches.DTO.Response.PaymentDayAndDataResponse;
import com.datn.sellWatches.DTO.Response.PaymentResponse;
import com.datn.sellWatches.DTO.Response.PaymentReturnResponse;
import com.datn.sellWatches.Entity.Order;
import com.datn.sellWatches.Entity.Payment;
import com.datn.sellWatches.Repository.PaymentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {
		private final PaymentRepository paymentRepository;
		
		public PaymentResponse createPayment(long amount) throws UnsupportedEncodingException {
			String vnp_Version = "2.1.0";
	          String vnp_Command = "pay";
	          String orderType = "other";
	          amount = amount *100;
	          
	          String vnp_TxnRef = ConfigPayment.getRandomNumber(8);
//	          String vnp_IpAddr = ConfigPayment.getIpAddress(req);
	          String vnp_IpAddr = "127.0.0.1";

	          String vnp_TmnCode = ConfigPayment.vnp_TmnCode;
	          
//	          String bankCode = null;
	          Map<String, String> vnp_Params = new HashMap<>();
	          vnp_Params.put("vnp_Version", vnp_Version);
	          vnp_Params.put("vnp_Command", vnp_Command);
	          vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
	          vnp_Params.put("vnp_Amount", String.valueOf(amount));
	          vnp_Params.put("vnp_CurrCode", "VND");
	          
//	          if (bankCode != null && !bankCode.isEmpty()) {
//	              vnp_Params.put("vnp_BankCode", bankCode);
//	          }
	          vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
	          vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
	          vnp_Params.put("vnp_OrderType", orderType);

//	          String locate = req.getParameter("language");
	          String locate = "vn";
	          if (locate != null && !locate.isEmpty()) {
	              vnp_Params.put("vnp_Locale", locate);
	          } else {
	              vnp_Params.put("vnp_Locale", "vn");
	          }
	          vnp_Params.put("vnp_ReturnUrl", ConfigPayment.vnp_ReturnUrl);
	          vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

	          Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
	          SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
	          String vnp_CreateDate = formatter.format(cld.getTime());
	          vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
	          
	          cld.add(Calendar.MINUTE, 15);
	          String vnp_ExpireDate = formatter.format(cld.getTime());
	          vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);
	          
	          List<String> fieldNames = new ArrayList<String>(vnp_Params.keySet());
	          Collections.sort(fieldNames);
	          StringBuilder hashData = new StringBuilder();
	          StringBuilder query = new StringBuilder();
	          Iterator<String> itr = fieldNames.iterator();
	          while (itr.hasNext()) {
	              String fieldName = (String) itr.next();
	              String fieldValue = (String) vnp_Params.get(fieldName);
	              if ((fieldValue != null) && (fieldValue.length() > 0)) {
	                  //Build hash data
	                  hashData.append(fieldName);
	                  hashData.append('=');
	                  hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.UTF_8.toString()));
	                  //Build query
	                  query.append(URLEncoder.encode(fieldName, StandardCharsets.UTF_8.toString()));
	                  query.append('=');
	                  query.append(URLEncoder.encode(fieldValue, StandardCharsets.UTF_8.toString()));
	                  if (itr.hasNext()) {
	                      query.append('&');
	                      hashData.append('&');
	                  }
	              }
	          }
	          String queryUrl = query.toString();
	          String vnp_SecureHash = ConfigPayment.hmacSHA512(ConfigPayment.secretKey, hashData.toString());
	          queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
	          String paymentUrl = ConfigPayment.vnp_PayUrl + "?" + queryUrl;
	          
	          PaymentResponse paymentResponse = PaymentResponse.builder()
	        		  .status("Ok")
	        		  .message("Successfully")
	        		  .URL(paymentUrl)
	        		  .build();
			return paymentResponse;
		}

		 public PaymentReturnResponse paymentReturn(PaymentReturnRequest request) throws UnsupportedEncodingException {
		        Map<String, String> params = new HashMap<>();
		        params.put("vnp_TxnRef", request.getVnp_TxnRef());
		        params.put("vnp_Amount", request.getVnp_Amount());
		        params.put("vnp_BankCode", request.getVnp_BankCode());
		        params.put("vnp_BankTranNo", request.getVnp_BankTranNo());
		        params.put("vnp_CardType", request.getVnp_CardType());
		        params.put("vnp_OrderInfo", request.getVnp_OrderInfo());
		        params.put("vnp_PayDate", request.getVnp_PayDate());
		        params.put("vnp_ResponseCode", request.getVnp_ResponseCode());
		        params.put("vnp_TmnCode", request.getVnp_TmnCode());
		        params.put("vnp_TransactionNo", request.getVnp_TransactionNo());
		        params.put("vnp_TransactionStatus", request.getVnp_TransactionStatus());
		        params.put("vnp_SecureHash", request.getVnp_SecureHash());
		        
		        String receivedHash = params.get("vnp_SecureHash");
		        params.remove("vnp_SecureHash");
		        params.remove("vnp_SecureHashType"); 
		        
		        Map<String, String> sortedParams = new TreeMap<>(params);
		        StringBuilder hashData = new StringBuilder();
		        for (Iterator<Map.Entry<String, String>> itr = sortedParams.entrySet().iterator(); itr.hasNext(); ) {
		            Map.Entry<String, String> entry = itr.next();
		            String key = entry.getKey();
		            String value = entry.getValue();
		            if (value != null && !value.isEmpty()) {
		                hashData.append(URLEncoder.encode(key, StandardCharsets.US_ASCII.toString()));
		                hashData.append("=");
		                hashData.append(URLEncoder.encode(value, StandardCharsets.US_ASCII.toString()));
		                if (itr.hasNext()) {
		                    hashData.append("&");
		                }
		            }
		        }
		        
		        String computedHash = ConfigPayment.hmacSHA512(ConfigPayment.secretKey, hashData.toString());
		        boolean validSignature = computedHash.equalsIgnoreCase(receivedHash);
		        String statusMessage;
		        if (validSignature) {
		            if ("00".equals(request.getVnp_TransactionStatus())) {
		                statusMessage = "Giao dịch thành công!";
		            } else {
		                statusMessage = "Giao dịch thất bại!";
		            }
		        } else {
		            statusMessage = "Chữ ký không hợp lệ";
		        }
		        
		        return PaymentReturnResponse.builder()
		                .status(validSignature ? "success" : "error")
		                .message(statusMessage)
		                .amount(request.getVnp_Amount())
		                .orderId(request.getVnp_BankTranNo())
		                .typePay("Thanh toán online")
		                .build();
		    }
		 	
		 	public boolean savePayment(String typePay, long amount, Order order) {
		 		try {
		 			Payment payment = Payment.builder()
			 				.ngay_thanh_toan(LocalDateTime.now())
			 				.loai(typePay)
			 				.so_tien(amount)
			 				.don_hang(order)
			 				.build();
		 			paymentRepository.save(payment);
			 		return true;
		 		}catch(Exception err) {
		 			return false;
		 		}
		 		
		 	}
		 	
		 	public DashboardBottom dashboardPayment(DashboardDayRequest request) {
				List<Object[]> payment = paymentRepository.getDashboardPayment(request.getStartDay(), request.getEndDay());
				List<PaymentDayAndDataResponse> responsePayment = new ArrayList<>();
				for(Object[] row : payment ) {
					PaymentDayAndDataResponse dto = PaymentDayAndDataResponse.builder()
							.day((Date) row[0])
							.data((BigDecimal) row[1])
							.build();
					responsePayment.add(dto);
				}
				return DashboardBottom.builder()
						.paymentResponse(responsePayment)
						.build();
			}
		 	public PageDataPaymentAdminResponse getDataPaymentAdmin(DataPaymentAdminRequest request) {
		 		Pageable pageable = PageRequest.of(request.getPage(), 10);
		 		Page<Object[]> paymentPage = paymentRepository.getDataTablePayment(
		 				request.getLoai(), 
		 				request.getMinGia(),
		 				request.getMaxGia(), 
		 				request.getNgayBatDau(), 
		 				request.getNgayKetThuc(), 
		 				pageable);
		 		int totalPage = paymentPage.getTotalPages()-1;
		 		List<DataPaymentAdminResponse> listRes = new ArrayList<>();
		 		for(Object[] row : paymentPage.getContent()) {
		 			listRes.add(
		 					DataPaymentAdminResponse.builder()
		 					.id((String) row[0])
		 					.loai((String) row[1])
		 					.ngayThanhToan( ((Timestamp) row[2]).toLocalDateTime().toLocalDate())
		 					.gia((Long) row[3])
		 					.maDonHang((String) row[4])
		 					.build());
		 		}
		 		return PageDataPaymentAdminResponse.builder()
		 				.totalPage(totalPage)
		 				.dataPaymentAdminResponses(listRes)
		 				.build();
		 	}

}
