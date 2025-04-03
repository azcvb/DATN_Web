package com.datn.sellWatches.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.datn.sellWatches.DTO.Request.FilterProductsRequest;
import com.datn.sellWatches.DTO.Response.FilterPageResponse;
import com.datn.sellWatches.DTO.Response.FilterProductsResponse;
import com.datn.sellWatches.DTO.Response.GetListProductsHomeResponse;
import com.datn.sellWatches.DTO.Response.GetProductByIdResponse;
import com.datn.sellWatches.DTO.Response.PageAndSearchProductResponse;
import com.datn.sellWatches.DTO.Response.SearchProductResponse;
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
	public PageAndSearchProductResponse searchProductResponse(String tenSanPham, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		tenSanPham = tenSanPham.replace('d', 'đ').replace('D', 'Đ');
		Page<Object[]> productsPage = productRepository.findTenSanPham(tenSanPham, pageable);
		int totalPages = productsPage.getTotalPages() - 1;
		List<SearchProductResponse> listResponses = new ArrayList<>();
        for (Object[] row : productsPage.getContent()) {
        	listResponses.add(
            		SearchProductResponse.builder()
            		.id((String) row[0])
                    .ma_san_pham((String) row[1])
                    .ten_san_pham((String) row[2])
                    .loai_may((String) row[3])
                    .duong_kinh((float) row[4])
                    .gia((int) row[5])
                    .ton_kho((int) row[6])
                    .hinh_anh((String) row[7])
                    .build()
            );
        }
		return PageAndSearchProductResponse.builder()
				.totalPages(totalPages)
				.searchProductResponse(listResponses)
				.build();
	}	
	public FilterPageResponse filterProduct(FilterProductsRequest request){
		Pageable pageable = PageRequest.of(request.getPage(), 20);
		String tenSanPham = null;
		if(request.getTenSanPham() != null) {
			tenSanPham = request.getTenSanPham().replace('d', 'đ').replace('D', 'Đ');
		}
		Page<Object[]> productsPage = productRepository.filterProducts(
				tenSanPham, 
				request.getGioiTinh(),
				request.getThuongHieu(),
				request.getMinGia(),
				request.getMaxGia(),
				request.getLoaiMay(),
				request.getMinDuongKinh(),
				request.getMaxDuongKinh(),
				request.getChatLieuDay(),
				request.getChatLieuVo(),
				request.getMatKinh(),
				request.getMauMat(),
				request.getPhongCach(),
				request.getKieuDang(),
				request.getXuatXu(),
				pageable);
		log.info(request.toString());
		int totalPages = productsPage.getTotalPages() - 1;
		List<FilterProductsResponse> listResponses = new ArrayList<>();
		for (Object[] row : productsPage.getContent()) {
        	listResponses.add(
        			FilterProductsResponse.builder()
        			.id((String) row[0])
        			.ma_san_pham((String) row[1])
        			.ten_san_pham((String) row[2])
        			.loai_may((String) row[3])	
        			.duong_kinh((Float) row[4])
        			.gia((Integer) row[5])
        			.hinh_anh((String) row[6])
                    .build()
            );
        }
		return FilterPageResponse.builder()
				.totalPage(totalPages)
				.filterProductsResponse(listResponses)
				.build();
	}
	
}
