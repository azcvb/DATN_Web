package com.datn.sellWatches.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.datn.sellWatches.Entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {

}
