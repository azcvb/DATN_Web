package com.datn.sellWatches.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.datn.sellWatches.Entity.Order;

@Repository
public interface OrdersRepository extends JpaRepository<Order, String> {

}
