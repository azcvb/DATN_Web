package com.datn.sellWatches.Entity;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
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
	List<OrderDetail> orderDetails;
	
}
