package com.datn.sellWatches.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.datn.sellWatches.Entity.Order;

public interface OrdersRepository extends JpaRepository<Order, String> {

}
