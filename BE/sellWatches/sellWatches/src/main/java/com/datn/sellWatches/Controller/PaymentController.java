package com.datn.sellWatches.Controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.datn.sellWatches.Configuration.ConfigPayment;
import com.datn.sellWatches.DTO.Response.ApiResponse;
import com.datn.sellWatches.DTO.Response.PaymentResponse;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @GetMapping
    public ApiResponse<?> createPayment( ) throws UnsupportedEncodingException {
    	  String vnp_Version = "2.1.0";
          String vnp_Command = "pay";
          String orderType = "other";
//          long amount = Integer.parseInt(req.getParameter("amount"))*100;
//          String bankCode = req.getParameter("bankCode");
          
          String vnp_TxnRef = ConfigPayment.getRandomNumber(8);
//          String vnp_IpAddr = ConfigPayment.getIpAddress(req);
          String vnp_IpAddr = "127.0.0.1";

          String vnp_TmnCode = ConfigPayment.vnp_TmnCode;
          
          long amount = 10000*100;   
//          String bankCode = null;
          Map<String, String> vnp_Params = new HashMap<>();
          vnp_Params.put("vnp_Version", vnp_Version);
          vnp_Params.put("vnp_Command", vnp_Command);
          vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
          vnp_Params.put("vnp_Amount", String.valueOf(amount));
          vnp_Params.put("vnp_CurrCode", "VND");
          
//          if (bankCode != null && !bankCode.isEmpty()) {
//              vnp_Params.put("vnp_BankCode", bankCode);
//          }
          vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
          vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
          vnp_Params.put("vnp_OrderType", orderType);

//          String locate = req.getParameter("language");
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
          
          List fieldNames = new ArrayList(vnp_Params.keySet());
          Collections.sort(fieldNames);
          StringBuilder hashData = new StringBuilder();
          StringBuilder query = new StringBuilder();
          Iterator itr = fieldNames.iterator();
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
          
          return ApiResponse.builder()
        		  .result(paymentResponse)
        		  .build();
    }
}
