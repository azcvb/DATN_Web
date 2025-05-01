package com.datn.sellWatches.Controller;

import com.datn.sellWatches.DTO.Request.StringRequest;
import com.datn.sellWatches.DTO.Response.ApiResponse;
import com.datn.sellWatches.Service.TypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/type")
public class TypeController {

    final TypeService typeService;

    @PostMapping("/addType")
    ApiResponse<Boolean> addNewType(@RequestBody StringRequest request){
        Boolean result = typeService.addNewType(request);
        return ApiResponse.<Boolean>builder()
                .result(result)
                .build();
    }
}
