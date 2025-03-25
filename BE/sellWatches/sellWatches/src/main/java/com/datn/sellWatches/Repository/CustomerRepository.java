package com.datn.sellWatches.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.datn.sellWatches.Entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, String> {

}
