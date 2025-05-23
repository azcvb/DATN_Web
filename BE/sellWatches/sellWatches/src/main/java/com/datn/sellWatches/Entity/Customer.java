package com.datn.sellWatches.Entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
	@Column(name = "so_dien_thoai")
    String soDienThoai;
	
	String ten_khach_hang;
	String email;
	String dia_chi;
	String gioi_tinh;
	LocalDate ngay_sinh;
	LocalDateTime ngay_tao;
	
	@OneToMany(mappedBy = "khach_hang", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	List<Order> orders = new ArrayList<>();
	
	@OneToOne
	@JoinColumn(name= "tai_khoan_id")
	Account tai_khoan_id;
}
