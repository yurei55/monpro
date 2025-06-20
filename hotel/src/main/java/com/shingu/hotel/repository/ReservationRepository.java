package com.shingu.hotel.repository;

import com.shingu.hotel.entity.ReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<ReservationEntity, Long> {
    List<ReservationEntity> findByUser_Id(Long userId); // ✅ 이렇게 수정

}