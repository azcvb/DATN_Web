package com.datn.sellWatches.Controller;

import java.io.UnsupportedEncodingException;
import java.util.Map;

import com.datn.sellWatches.DTO.Request.StringRequest;
import com.datn.sellWatches.DTO.Response.PaymentResponse.BillContentResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.datn.sellWatches.DTO.Request.DataPaymentAdminRequest;
import com.datn.sellWatches.DTO.Request.PaymentReturnRequest;
import com.datn.sellWatches.DTO.Response.ApiResponse;
import com.datn.sellWatches.DTO.Response.PaymentResponse.PageDataPaymentAdminResponse;
import com.datn.sellWatches.DTO.Response.PaymentResponse.PaymentResponse;
import com.datn.sellWatches.DTO.Response.PaymentResponse.PaymentReturnResponse;
import com.datn.sellWatches.Service.PaymentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

	private final PaymentService paymentService;


    @GetMapping
    public ApiResponse<?> createPayment(@RequestParam("amount") long amount) throws UnsupportedEncodingException{
    	PaymentResponse result = paymentService.createPayment(amount);
        return ApiResponse.builder()
        		  .result(result)
        		  .build();
    }
    @GetMapping("/return")
    public ApiResponse<PaymentReturnResponse> checkTransaction(@RequestParam Map<String, String> params) throws UnsupportedEncodingException {
        PaymentReturnRequest request = PaymentReturnRequest.builder()
                .vnp_TxnRef(params.get("vnp_TxnRef"))
                .vnp_Amount(params.get("vnp_Amount"))
                .vnp_BankCode(params.get("vnp_BankCode"))
                .vnp_BankTranNo(params.get("vnp_BankTranNo"))
                .vnp_CardType(params.get("vnp_CardType"))
                .vnp_OrderInfo(params.get("vnp_OrderInfo"))
                .vnp_PayDate(params.get("vnp_PayDate"))
                .vnp_ResponseCode(params.get("vnp_ResponseCode"))
                .vnp_TmnCode(params.get("vnp_TmnCode"))
                .vnp_TransactionNo(params.get("vnp_TransactionNo"))
                .vnp_TransactionStatus(params.get("vnp_TransactionStatus"))
                .vnp_SecureHash(params.get("vnp_SecureHash"))
                .build();
        
        PaymentReturnResponse response = paymentService.paymentReturn(request);
        return ApiResponse.<PaymentReturnResponse>builder()
                .result(response)
                .build();
    }
    @PostMapping("/dataAdmin")
    public ApiResponse<PageDataPaymentAdminResponse> getDataPaymentAdmin(@RequestBody DataPaymentAdminRequest request){
    	PageDataPaymentAdminResponse result = paymentService.getDataPaymentAdmin(request);
    	
    	return ApiResponse.<PageDataPaymentAdminResponse>builder()
    			.result(result)
    			.build();
    }

    @PostMapping("/billContent")
    public  ApiResponse<BillContentResponse> getBillContent(@RequestBody StringRequest request) {
        BillContentResponse resutl = paymentService.getBillContent(request);
        return ApiResponse.<BillContentResponse>builder()
                .result(resutl)
                .build();
    }
}
 