package com.shingu.hotel.repository;

import com.shingu.hotel.entity.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<RoomEntity, Long> {
    Optional<RoomEntity> findByRoomTypeAndHotelId(String roomType, Long hotelId);//unll 안전성 추가
    // 특정 호텔의 객실 전체 조회용
    List<RoomEntity> findByHotelId(Long hotelId);
}
