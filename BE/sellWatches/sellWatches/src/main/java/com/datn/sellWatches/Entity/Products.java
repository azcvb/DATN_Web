package com.datn.sellWatches.Entity;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "san_pham")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Products {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	String id;
	
	String ma_san_pham;
	String ten_san_pham;
	int gia;
	@Lob
	String mo_ta;
	String loai_may;
	String mat_kinh;
	String chat_lieu_vo;
	String chat_lieu_day;
	String mau_mat;
	String xuat_xu;
	String kieu_dang;
	String phong_cach;
	float duong_kinh;
	float do_day;
	String khang_nuoc;
	String bao_hanh_hang;
	String bao_hanh_shop;
	String hinh_anh;
	LocalDate ngay_tao;
	String khac;
	String thuong_hieu;
	String gioi_tinh;
	
	@JsonManagedReference
	@ManyToOne
	@JoinColumn(name = "loai_id")
	private Types loai;
	
	@OneToMany(mappedBy = "products", cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<Warehouse> warehouse;
	
	@OneToMany(mappedBy = "san_pham", cascade = CascadeType.ALL, fetch = FetchType.LAZY)

	@JsonManagedReference
	List<OrderDetail> orderDetails;
	
}
