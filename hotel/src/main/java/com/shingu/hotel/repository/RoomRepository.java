package com.shingu.hotel.repository;

import com.shingu.hotel.entity.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<RoomEntity, Long> {
    // 여러 결과를 받을 수 있게 List로 수정
    List<RoomEntity> findByRoomTypeAndHotelId(String roomType, Long hotelId);//unll 안전성 추가
    // 특정 호텔의 객실 전체 조회용
    List<RoomEntity> findByHotelId(Long hotelId);
}
