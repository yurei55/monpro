// src/main/java/com/shingu/hotel/service/HotelService.java
package com.shingu.hotel.service;

import com.shingu.hotel.dto.HotelDetailDto;
import com.shingu.hotel.dto.HotelSummaryDto;
import com.shingu.hotel.dto.HotelSearchResultDto;
import com.shingu.hotel.dto.RoomDto;
import com.shingu.hotel.entity.HotelEntity;
import com.shingu.hotel.entity.RoomEntity;
import com.shingu.hotel.repository.HotelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HotelService {

    private final HotelRepository hotelRepository;

    // ✅ 전체 호텔 리스트 (rooms 없이) → HotelSummaryDto 사용
    public List<HotelSummaryDto> getAllHotels() {
        return hotelRepository.findAll().stream().map(hotel -> {
            HotelSummaryDto dto = new HotelSummaryDto();
            dto.setHotelId(hotel.getId());
            dto.setHotelName(hotel.getHotelName());
            dto.setImageUrl(hotel.getImageUrl());
            dto.setRegion(hotel.getRegion());
            dto.setRating(hotel.getRating());
            return dto;
        }).collect(Collectors.toList());
    }

    // ✅ 검색 결과 DTO 사용 시 (조건 검색용)
    public List<HotelSearchResultDto> searchHotels(String region, Integer roomCount,
                                                   int totalGuests, LocalDate checkIn, LocalDate checkOut) {
        // 1. 지역 조건에 따라 전체 또는 지역별 조회
        List<HotelEntity> hotels = (region == null || region.isBlank())
                ? hotelRepository.findAllWithRooms()
                : hotelRepository.findByRegionWithRooms(region);

        // 2. 호텔마다 조건 맞는 객실 필터링
        return hotels.stream().map(hotel -> {
            HotelSearchResultDto dto = new HotelSearchResultDto();
            dto.setHotelId(hotel.getId());
            dto.setHotelName(hotel.getHotelName());
            dto.setImageUrl(hotel.getImageUrl());
            dto.setRegion(hotel.getRegion());
            dto.setRating(hotel.getRating());

            // 예약 가능한 객실만 필터링
            List<RoomEntity> availableRooms = hotel.getRooms().stream()
                    .filter(room -> isRoomAvailable(room, checkIn, checkOut))
                    .filter(room -> room.getMaxCapacity() >= totalGuests)
                    .collect(Collectors.toList());

            boolean soldOut = availableRooms.size() < roomCount;
            dto.setSoldOut(soldOut);

            return dto;
        }).collect(Collectors.toList());
    }

    // ✅ 특정 호텔 상세 정보 (rooms 포함)
    public HotelDetailDto getHotelDetail(Long id) {
        HotelEntity hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("호텔을 찾을 수 없습니다."));

        HotelDetailDto dto = new HotelDetailDto();
        BeanUtils.copyProperties(hotel, dto);

        List<RoomDto> roomDtos = hotel.getRooms().stream().map(room -> {
            RoomDto r = new RoomDto();
            BeanUtils.copyProperties(room, r);
            r.setPrice(String.format("₩%,d", room.getPrice()));
            r.setImageUrl(room.getImageUrl()); // ✅ 이미지 URL 포함
            return r;
        }).collect(Collectors.toList());

        dto.setRooms(roomDtos);
        return dto;
    }

    private boolean isRoomAvailable(RoomEntity room, LocalDate checkIn, LocalDate checkOut) {
        return room.getReservations().stream().noneMatch(res ->
                !(res.getCheckOutDate().isBefore(checkIn) || res.getCheckInDate().isAfter(checkOut))
        );
    }
}
