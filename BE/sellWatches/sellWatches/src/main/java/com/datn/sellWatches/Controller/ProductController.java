package com.datn.sellWatches.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.HandlerMapping;

import com.datn.sellWatches.DTO.Response.ApiResponse;
import com.datn.sellWatches.DTO.Response.GetListProductsHomeResponse;
import com.datn.sellWatches.DTO.Response.GetProductByIdResponse;
import com.datn.sellWatches.Service.ProductService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/products")
public class ProductController {
	@Autowired
	ProductService productService;
	
	@GetMapping
	public ApiResponse<Map<String, List<GetListProductsHomeResponse>>> getProductHome() {
		Map<String, List<GetListProductsHomeResponse>> result = productService.getListProductHome();
		return ApiResponse.<Map<String,List<GetListProductsHomeResponse>>>builder()
				.result(result)
				.build();
	}
	
	@GetMapping("/**")
	public ApiResponse<GetProductByIdResponse> getProductById(HttpServletRequest request) {
	    String bestMatchingPattern = (String) request.getAttribute(HandlerMapping.BEST_MATCHING_PATTERN_ATTRIBUTE);
	    String path = (String) request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
	    
	    AntPathMatcher apm = new AntPathMatcher();
	    String wildcardPart = apm.extractPathWithinPattern(bestMatchingPattern, path);
	    
	    return ApiResponse.<GetProductByIdResponse>builder()
	            .result(productService.getProduct(wildcardPart))
	            .build();
	}
	
}
