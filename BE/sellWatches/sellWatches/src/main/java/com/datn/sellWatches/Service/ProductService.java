package com.datn.sellWatches.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.datn.sellWatches.DTO.Request.AddProductRequest;
import com.datn.sellWatches.DTO.Request.FilterProductAdminRequest;
import com.datn.sellWatches.DTO.Request.FilterProductsRequest;
import com.datn.sellWatches.DTO.Request.IdProductRequest;
import com.datn.sellWatches.DTO.Request.UpdateProductRequest;
import com.datn.sellWatches.DTO.Response.FilterPageResponse;
import com.datn.sellWatches.DTO.Response.FilterProductAdminResponse;
import com.datn.sellWatches.DTO.Response.FilterProductsResponse;
import com.datn.sellWatches.DTO.Response.GetListProductsHomeResponse;
import com.datn.sellWatches.DTO.Response.GetProductByIdResponse;
import com.datn.sellWatches.DTO.Response.GetProductForCar;
import com.datn.sellWatches.DTO.Response.GetProductTableAdminResponse;
import com.datn.sellWatches.DTO.Response.ListFilterProductAdminResponse;
import com.datn.sellWatches.DTO.Response.PageAndSearchProductResponse;
import com.datn.sellWatches.DTO.Response.SearchProductResponse;
import com.datn.sellWatches.Entity.Products;
import com.datn.sellWatches.Entity.Types;
import com.datn.sellWatches.Entity.Warehouse;
import com.datn.sellWatches.Exception.AppException;
import com.datn.sellWatches.Exception.ErrorCode;
import com.datn.sellWatches.Mapper.ProductsMapper;
import com.datn.sellWatches.Repository.ProductRepository;
import com.datn.sellWatches.Repository.TypeRepository;
import com.datn.sellWatches.Repository.WarehouseRepository;

import jakarta.transaction.Transactional;
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
	final TypeRepository typeRepository;
	final WarehouseRepository warehouseRepository;
	
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
	            	 Page<Object[]> page = productRepository.getProductsInTypeWhereQuantity(validListType(tenLoai), pageable);
		                
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
                    .loai((String) row[8])
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
        			.loai((String) row[7])
                    .build()
            );
        }
		return FilterPageResponse.builder()
				.totalPage(totalPages)
				.filterProductsResponse(listResponses)
				.build();
	}
	
	public ListFilterProductAdminResponse filterProductAdmin(FilterProductAdminRequest request) {
		Pageable pageable = PageRequest.of(request.getPage(), 10);
		String tenSanPham = null;
		if(request.getTenSanPham() != null) {
			tenSanPham = request.getTenSanPham().replace('d', 'đ').replace('D', 'Đ');
		}
		Page<Object[]> productsPage = productRepository.filterProductAdmin(
				tenSanPham, 
				request.getLoai(),
				request.getMinGia(),
				request.getMaxGia(),
				request.getLoai(),
				request.getTonKho(),
				request.getNgayBatDau(),
				request.getNgayKetThuc(),
				pageable);
		int totalPages = productsPage.getTotalPages() - 1;
		List<FilterProductAdminResponse> listResponses = new ArrayList<>();
		for (Object[] row : productsPage.getContent()) {
        	listResponses.add(
        			FilterProductAdminResponse.builder()
        			.id((String) row[0])
        			.maSanPham((String) row[1])
        			.tenSanPham((String) row[2])
        			.gia((Integer) row[3])
        			.loai((String) row[4])
        			.tonKho((Integer) row[5])
        			.daBan((Integer) row[6])
        			.ngayTao((Date) row[7])
                    .build()
            );
        }
		return ListFilterProductAdminResponse.builder()
				.totalPage(totalPages)
				.filterProductAdminResponses(listResponses)
				.build();
	}
	@Transactional
	public boolean addProduct(AddProductRequest request) {
		try {
			LocalDate dateNow = LocalDate.now();
			Types loai = typeRepository.findByTenLoai(request.getLoaiSanPham())
					.orElseThrow(() -> new AppException(ErrorCode.TYPE_NOT_EXIT));
			Products product = Products.builder()
					.ma_san_pham(request.getMaSanPham())
					.ten_san_pham(request.getTenSanPham())
					.mo_ta(request.getMoTa())
					.loai_may(request.getLoaiMay())
					.mat_kinh(request.getMatKinh())
					.chat_lieu_vo(request.getChatLieuVo())
					.chat_lieu_day(request.getChatLieuDay())
					.mau_mat(request.getMauMat())
					.xuat_xu(request.getXuatXu())
					.kieu_dang(request.getKieuDang())
					.phong_cach(request.getPhongCach())
					.duong_kinh(request.getDuongKinh())
					.do_day(request.getDoDay())
					.khang_nuoc(request.getKhangNuoc())
					.bao_hanh_hang(request.getBaoHanhHang())
					.bao_hanh_shop(request.getBaoHanhShop())
					.hinh_anh(request.getHinhAnh())
					.ngay_tao(request.getNgayTao())
					.khac(request.getKhac())
					.thuong_hieu(request.getThuongHieu())
					.gioi_tinh(request.getGioiTinh())
					.ngay_tao(dateNow)
					.loai(loai)
					.build();
			productRepository.save(product);
			Warehouse warehouse = Warehouse.builder()
					.da_ban(0)
					.gia_nhap(request.getGia())
					.ton_kho(request.getSoLuong())
					.products(product)
					.ngay_nhap(dateNow)
					.build();
			warehouseRepository.save(warehouse);
			return true;
		}catch(Exception e) {
			log.info(e.toString());
			return false;
		}
		
	}
	public List<GetProductForCar> getProductForCar(List<String> request){
		List<GetProductForCar> result = new ArrayList<GetProductForCar>();
		for (String id : request) {
			 List<Object[]> rows = productRepository.getProductForCar(id);
		        for (Object[] row : rows) {
		            GetProductForCar item = GetProductForCar.builder()
		                .id((String) row[0])
		                .ma_san_pham((String) row[1])
		                .ten_san_pham((String) row[2])
		                .gia((int) row[3]) 
		                .hinh_anh((String) row[4])
		                .build();
		            result.add(item);
		        }
		}
		return result;
	}
	
	public Boolean removeProductId(List<String> request) {
		try {
			for(String id : request) {
				productRepository.deleteById(id);
			}
			return true;	
		}catch(Exception e) {
			log.info(e.toString());
			return false;
		}
		
	}
	public Boolean getProductUpdate(UpdateProductRequest request)  {
		try {
			Types type = typeRepository.findByTenLoai(request.getLoaiSanPham())
					.orElseThrow(() -> new AppException(ErrorCode.TYPE_NOT_EXIT));
			log.info(request.getMaSanPham());
			Products product = productRepository.findById(request.getId())
		            .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXIT)); 
			LocalDate date = LocalDate.now();
		    Products updatedProduct = Products.builder()
		            .id(product.getId())  
		            .ma_san_pham(request.getMaSanPham())
		            .ten_san_pham(request.getTenSanPham())
		            .gia(request.getGia())
		            .mo_ta(request.getMoTa())
		            .loai_may(request.getLoaiMay())
		            .mat_kinh(request.getMatKinh())
		            .chat_lieu_vo(request.getChatLieuVo())
		            .chat_lieu_day(request.getChatLieuDay())
		            .mau_mat(request.getMauMat())
		            .xuat_xu(request.getXuatXu())
		            .kieu_dang(request.getKieuDang())
		            .phong_cach(request.getPhongCach())
		            .duong_kinh(request.getDuongKinh())
		            .do_day(request.getDoDay())
		            .khang_nuoc(request.getKhangNuoc())
		            .bao_hanh_hang(request.getBaoHanhHang())
		            .bao_hanh_shop(request.getBaoHanhShop())
		            .hinh_anh(request.getHinhAnh())
		            .ngay_tao(date)
		            .khac(request.getKhac())
		            .loai(type)  
		            .build();

		    productRepository.save(updatedProduct);

		    return true; 	
		    }catch(Exception e) {
		    	log.info(e.toString());
			return false;
		}
	}
	
	public GetProductTableAdminResponse getProductIdAdmin(IdProductRequest request) {
	    Object[] product = (Object[])productRepository.getProductTableAdmin(request.getId());

	    GetProductTableAdminResponse dto = GetProductTableAdminResponse.builder()
	        .id((String) product[0])
	        .maSanPham((String) product[1])
	        .tenSanPham((String) product[2])
	        .gia((int) product[3])
	        .moTa((String) product[4])
	        .loaiMay((String) product[5])
	        .matKinh((String) product[6])
	        .chatLieuVo((String) product[7])
	        .chatLieuDay((String) product[8])
	        .mauMat((String) product[9])
	        .xuatXu((String) product[10])
	        .kieuDang((String) product[11])
	        .phongCach((String) product[12])
	        .duongKinh(((Number) product[13]).floatValue())
	        .doDay(((Number) product[14]).floatValue())
	        .khangNuoc((String) product[15])
	        .baoHanhHang((String) product[16])
	        .baoHanhShop((String) product[17])
	        .hinhAnh((String) product[18])
	        .khac((String) product[19])
	        .thuongHieu((String) product[20])
	        .gioiTinh((String) product[21])
	        .soLuong((int) product[22])
	        .loai((String) product[23])
	        .build();
	    return dto;
	}
	
}
