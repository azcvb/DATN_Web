package com.datn.sellWatches.Entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "tai_khoan")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	String id;
	String tenTaiKhoan;
	String matKhau;
	
	@OneToOne
	@JoinColumn(name = "quyen_id", nullable = false)
	Role quyen;
	
	@OneToOne(mappedBy = "tai_khoan_id", cascade = CascadeType.ALL)
	Customer khach_hang;
	
	@OneToOne(mappedBy = "tai_khoan_id", cascade = CascadeType.ALL)
	Employee nhan_vien;
}
