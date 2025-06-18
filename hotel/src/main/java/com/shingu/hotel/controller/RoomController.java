package com.shingu.hotel.controller;

import com.shingu.hotel.dto.RoomDto;
import com.shingu.hotel.entity.RoomEntity;
import com.shingu.hotel.repository.HotelRepository;
import com.shingu.hotel.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;

    @GetMapping("/hotel/{hotelId}")
    public List<RoomDto> getRoomsByHotelId(@PathVariable Long hotelId) {
        return roomRepository.findByHotelId(hotelId).stream().map(room -> {
            RoomDto dto = new RoomDto();
            dto.setId(room.getId()); // ✅ roomId
            dto.setRoomType(room.getRoomType());
            dto.setPrice(room.getPrice());
            dto.setImageUrl(room.getImageUrl());
            // 필요하면 facility도 추가 가능
            return dto;
        }).collect(Collectors.toList());
    }
}
