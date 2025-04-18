package com.datn.sellWatches.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.chrono.IsoChronology;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.format.ResolverStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.springframework.stereotype.Service;

import com.datn.sellWatches.DTO.Request.DashboardDayRequest;
import com.datn.sellWatches.DTO.Request.SaveCustomerRequest;
import com.datn.sellWatches.DTO.Response.DasboardCustomerResponse;
import com.datn.sellWatches.DTO.Response.DayAndDataResponse;
import com.datn.sellWatches.DTO.Response.SaveCustomerResponse;
import com.datn.sellWatches.Entity.Customer;
import com.datn.sellWatches.Repository.CustomerRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerService {
	private final CustomerRepository customerRepository;
	
	SaveCustomerResponse saveCustomerByOrder(SaveCustomerRequest request) {
		boolean isCustomer = false;
	
		LocalDate dob = LocalDate.parse(request.getNgay_sinh());
		Customer customer = Customer.builder()
				.ten_khach_hang(request.getTen_khach_hang())
				.email(request.getEmail())
				.soDienThoai(request.getSo_dien_thoai())
				.dia_chi(request.getDia_chi())
				.ngay_sinh(dob)
				.ngay_tao(LocalDateTime.now())
				.build();
		try {
			customer = customerRepository.save(customer);
			isCustomer = true;
		}catch (Exception e) {
			log.info(e.toString());
		}
		return SaveCustomerResponse.builder()
				.isCustomer(isCustomer)
				.customer(customer)
				.build();
	};
	
	public DasboardCustomerResponse getDasboardCustomer(DashboardDayRequest request) {
			List<Object[]> customerRes = customerRepository.getNewCustomer(request.getStartDay(),request.getEndDay());
			List<DayAndDataResponse> resDay = new ArrayList<>();
			for(Object[] row : customerRes) {
				DayAndDataResponse dto = DayAndDataResponse.builder()
						.day((Date) row[0])
						.data((long) row[1])
						.build();
				resDay.add(dto);
			}
			return DasboardCustomerResponse.builder()
					.customerRes(resDay)
					.build();
	}

}
