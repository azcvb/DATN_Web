package com.datn.sellWatches.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.datn.sellWatches.Entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, String> {

}
