package com.datn.sellWatches.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.datn.sellWatches.Entity.Ship;

public interface ShipRepository extends JpaRepository<Ship, String> {

}
