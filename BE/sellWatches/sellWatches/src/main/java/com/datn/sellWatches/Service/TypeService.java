package com.datn.sellWatches.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.datn.sellWatches.Repository.TypeRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class TypeService {
	private final TypeRepository typeRepository;
	
	public List<String> getDistinctType() {
		return typeRepository.getDistinctType();
	}
}
