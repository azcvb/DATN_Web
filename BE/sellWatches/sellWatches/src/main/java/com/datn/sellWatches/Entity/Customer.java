package com.datn.sellWatches.Entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "khach_hang")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	String id;
	
	String ten_khach_hang;
	String email;
	String so_dien_thoai;
	String mat_khau;
	String dia_chi;
	String gioi_tinh;
	LocalDateTime ngay_sinh;
	
	@OneToMany(mappedBy = "khach_hang", cascade = CascadeType.ALL, orphanRemoval = true)
	List<Order> orders = new ArrayList<>();
}
