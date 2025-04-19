package com.datn.sellWatches.Entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "nhan_vien")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Employee {
	@Id
	@Column(name = "id")
    String id;
	
	String tenNhanVien;
	String soDienThoai;
	String email;
	String chucVu;
	long luong;
	String trangThai;
	
	@OneToOne
	@JoinColumn(name= "nhan_vien")
	Account tai_khoan_id;
}
