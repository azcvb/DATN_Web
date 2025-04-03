package com.datn.sellWatches.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.MergedAnnotations.Search;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.HandlerMapping;

import com.datn.sellWatches.DTO.Request.FilterProductsRequest;
import com.datn.sellWatches.DTO.Response.ApiResponse;
import com.datn.sellWatches.DTO.Response.FilterPageResponse;
import com.datn.sellWatches.DTO.Response.GetListProductsHomeResponse;
import com.datn.sellWatches.DTO.Response.GetProductByIdResponse;
import com.datn.sellWatches.DTO.Response.PageAndSearchProductResponse;
import com.datn.sellWatches.DTO.Response.SearchProductResponse;
import com.datn.sellWatches.Entity.Products;
import com.datn.sellWatches.Service.ProductService;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.RequestParam;


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
	@GetMapping("/search")
	public ApiResponse<PageAndSearchProductResponse> getMethodName(
			@RequestParam(value = "q",  required = false, defaultValue = "") String tenSanPham, 
			@RequestParam(value = "page", defaultValue = "0") int page,
			 @RequestParam(name = "size", defaultValue = "20") int size) {
		PageAndSearchProductResponse result = productService.searchProductResponse(tenSanPham, page, size);
		return ApiResponse.<PageAndSearchProductResponse>builder()
				.result(result)
				.build();
	}
	@PostMapping("/filter")
	public ApiResponse<FilterPageResponse> filterProducts(@RequestBody FilterProductsRequest request) {
		FilterPageResponse result = productService.filterProduct(request);
		return ApiResponse.<FilterPageResponse>builder()
				.result(result)
				.build();
	}
	
}
