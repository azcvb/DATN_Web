package com.datn.sellWatches.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "chi_tiet_don_hang")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	String id;
	
	int so_luong;
	long gia;
	
	@ManyToOne
    @JoinColumn(name = "don_hang_id", nullable = false) 
    Order don_hang; 

	@ManyToOne
	@JoinColumn(name = "san_pham_id", nullable = false) 
	Products san_pham;
	
}
