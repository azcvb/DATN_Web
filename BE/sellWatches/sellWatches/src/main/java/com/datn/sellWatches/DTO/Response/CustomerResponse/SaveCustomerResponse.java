package com.datn.sellWatches.DTO.Response.CustomerResponse;

import com.datn.sellWatches.Entity.Customer;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SaveCustomerResponse {
	boolean isCustomer;
	Customer customer;
}
