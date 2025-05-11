package com.datn.sellWatches.Entity;

import jakarta.persistence.*;
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
	
	@ManyToOne
	@JoinColumn(name = "quyen_id", nullable = false)
	Role quyen;
	
	@OneToOne(mappedBy = "tai_khoan_id", cascade = CascadeType.ALL)
	Customer khach_hang;
}
