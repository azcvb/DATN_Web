package com.datn.sellWatches.Controller;

import com.datn.sellWatches.DTO.Request.StringRequest;
import com.datn.sellWatches.DTO.Response.ApiResponse;
import com.datn.sellWatches.DTO.Response.CustomerResponse.GetInfoCustomerResponse;
import com.datn.sellWatches.Service.CustomerService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerController {
    private CustomerService customerService;

    @PostMapping("/getInfor")
    public ApiResponse<GetInfoCustomerResponse> getInforCustomer(@RequestBody StringRequest request) {
        GetInfoCustomerResponse result = customerService.getInfoCustomer(request);
        if(result == null){
            return ApiResponse.<GetInfoCustomerResponse>builder()
                    .message("CUSTOMER_NOT_EXIT")
                    .result(null)
                    .build();
        }
        return ApiResponse.<GetInfoCustomerResponse>builder()
                .result(result)
                .build();
    }
}
