package com.datn.sellWatches.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.datn.sellWatches.Entity.Ship;

@Repository
public interface ShipRepository extends JpaRepository<Ship, String> {

}
