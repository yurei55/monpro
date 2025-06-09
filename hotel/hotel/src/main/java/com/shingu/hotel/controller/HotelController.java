// src/main/java/com/shingu/hotel/controller/HotelController.java
package com.shingu.hotel.controller;

import com.shingu.hotel.dto.HotelDetailDto;
import com.shingu.hotel.dto.HotelSummaryDto;
import com.shingu.hotel.service.HotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hotels")
@RequiredArgsConstructor
public class HotelController {

    private final HotelService hotelService;

    // ✅ 전체 호텔 리스트 → HotelSummaryDto 리턴
    @GetMapping
    public List<HotelSummaryDto> getAllHotels() {
        return hotelService.getAllHotels();
    }

    // ✅ 상세 정보
    @GetMapping("/{id}")
    public HotelDetailDto getHotelById(@PathVariable Long id) {
        return hotelService.getHotelDetail(id);
    }


}
