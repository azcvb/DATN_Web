package com.datn.sellWatches.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "van_chuyen")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Ship {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	String id;
	
	LocalDateTime ngay_van_chuyen;
	String dia_chi;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false, columnDefinition = "VARCHAR(255) DEFAULT 'PENDING'")
	@Builder.Default
	Status trang_thai = Status.PENDING;
	
	@OneToOne
	@JoinColumn(name = "don_hang_id")
	Order don_hang;
	
	enum Status{
		PENDING, DELIVERING,SUCCESS, RETURN;
	}
}
