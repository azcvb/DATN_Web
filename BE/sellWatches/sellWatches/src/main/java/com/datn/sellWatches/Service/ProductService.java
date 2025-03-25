package com.datn.sellWatches.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.datn.sellWatches.DTO.Response.GetListProductsHomeResponse;
import com.datn.sellWatches.DTO.Response.GetProductByIdResponse;
import com.datn.sellWatches.Entity.Products;
import com.datn.sellWatches.Exception.AppException;
import com.datn.sellWatches.Exception.ErrorCode;
import com.datn.sellWatches.Mapper.ProductsMapper;
import com.datn.sellWatches.Repository.ProductRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ProductService {

	final ProductRepository productRepository;
	final ProductsMapper productsMapper;
	
	public Map<String, List<GetListProductsHomeResponse>> getListProductHome() {
	    Pageable pageable = PageRequest.of(0, 10);
	    Map<String, List<GetListProductsHomeResponse>> result = new HashMap<>();
	    
	    List<String> listLoai = Arrays.asList("newNam", "newNu", "newDoi", "quaNam", "quaNu", "quaDoi");
	    
	    try {
	        for (String tenLoai : listLoai) {
	            List<GetListProductsHomeResponse> listResponse = new ArrayList<>();
	            
	            if (tenLoai.startsWith("new")) {
	                Page<Object[]> page = productRepository.getProductsInTypeWhereNew(validListType(tenLoai), pageable);
	                for (Object[] row : page.getContent()) {
	                    listResponse.add(
	                    		GetListProductsHomeResponse.builder()
	                    		.id((String) row[0])
	                            .hinh_anh((String) row[1])
	                            .ten_san_pham((String) row[2])
	                            .ma_san_pham((String) row[3])
	                            .loai_may((String) row[4])
	                            .duong_kinh((float) row[5])
	                            .gia((int) row[6])
	                            .build()
	                    );
	                }
	            } 
	            else if (tenLoai.startsWith("qua")) {
	                Page<Object[]> page = productRepository.getProductsInTypeWhereNew(validListType(tenLoai), pageable);
	                for (Object[] row : page.getContent()) {
	                    listResponse.add(
	                    		GetListProductsHomeResponse.builder()
	                    		.id((String) row[0])
	                            .hinh_anh((String) row[1])
	                            .ten_san_pham((String) row[2])
	                            .ma_san_pham((String) row[3])
	                            .loai_may((String) row[4])
	                            .duong_kinh((float) row[5])
	                            .gia((int) row[6])
	                            .build()
	                    );
	                }
	            }
	            
	            result.put(tenLoai, listResponse);
	        }
	    } catch(Exception e) {
	        log.info(e.toString());
	    }
		return result;
	}
	public GetProductByIdResponse getProduct(String productId) {
		log.info(productId);
		Products products = productRepository.findById(productId)
				.orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXIT));
		
		return productsMapper.toGetProductById(products);
	}
	
	public String validListType(String typeCode) {
		String type = typeCode.substring(3);
		 if(type.equals("Nam")) {
		        return "Đồng hồ Nam";
		    }
		    if(type.equals("Nu")) {
		        return "Đồng hồ Nữ";
		    }
		    if(type.equals("Doi")) {
		        return "Đồng hồ Đôi";
		    }
		    return null;
	}
}
