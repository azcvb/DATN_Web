package com.datn.sellWatches.Service;

import java.util.List;

import com.datn.sellWatches.DTO.Request.StringRequest;
import com.datn.sellWatches.Entity.Types;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.datn.sellWatches.Repository.TypeRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
@Slf4j
public class TypeService {
	private final TypeRepository typeRepository;

	public List<String> getDistinctType() {
		return typeRepository.getDistinctType();
	}
	public Boolean addNewType(StringRequest request) {
		try {
			String typeFomat = request.getName().replaceAll("\"", "");
			if (typeRepository.findByTenLoai(typeFomat).isPresent()) {
				return false;
			}
			Types type = Types.builder()
					.tenLoai(typeFomat)
					.build();
			typeRepository.save(type);
		}catch(Exception e) {
			log.info(e.toString());
			return false;
		}
		return true;
	}
}

