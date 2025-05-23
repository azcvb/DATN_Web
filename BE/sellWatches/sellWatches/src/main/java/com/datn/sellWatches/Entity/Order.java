package com.datn.sellWatches.Entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Table(name = "don_hang")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	String id;
	
	LocalDateTime ngay_dat;
	long tong_gia;
	String khac;
	String muc_dich;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false, columnDefinition = "VARCHAR(255) DEFAULT 'PENDING'")
	@Builder.Default
	StatusOrder trang_thai = StatusOrder.PENDING;
	
	@ManyToOne
	@JoinColumn(name = "khach_hang_id")
	@JsonBackReference
	Customer khach_hang;
	
	@OneToOne(mappedBy = "don_hang", cascade = CascadeType.ALL)
	Ship van_chuyen;

	@JsonManagedReference
	@OneToOne(mappedBy = "don_hang", cascade = CascadeType.ALL)
	Payment thanh_toan;

	@JsonManagedReference
	@OneToMany(mappedBy = "don_hang", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	List<OrderDetail> orderDetails;
	
	public enum StatusOrder{
		PENDING, ACCEPT,CANCEL;
	}
}
