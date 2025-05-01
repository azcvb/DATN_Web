package com.datn.sellWatches.DTO.Response.ProductResponse;

import java.util.List;

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
public class FilterPageResponse {
	List<FilterProductsResponse> filterProductsResponse;
	int totalPage;
}
