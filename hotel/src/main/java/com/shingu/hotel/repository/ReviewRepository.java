package com.shingu.hotel.repository;

import com.shingu.hotel.entity.ReviewEntity;
import com.shingu.hotel.entity.HotelEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {
    List<ReviewEntity> findByHotel(HotelEntity hotel);  // 호텔별 리뷰 전체 조회
}
