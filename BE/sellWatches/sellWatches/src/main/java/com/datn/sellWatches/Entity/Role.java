package com.datn.sellWatches.Entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Table(name = "quyen")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Role {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	String id;
	String tenQuyen;
	
	@OneToMany(mappedBy = "quyen", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	List<Account> account;
}
