package com.datn.sellWatches.Mapper;

import org.mapstruct.Mapper;

import com.datn.sellWatches.DTO.Response.GetProductByIdResponse;
import com.datn.sellWatches.Entity.Products;

@Mapper(componentModel = "spring")
public interface ProductsMapper {
	GetProductByIdResponse toGetProductById(Products product);
}
