package com.shingu.hotel.controller;

import com.shingu.hotel.dto.HotelSearchResultDto;
import com.shingu.hotel.service.HotelSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/hotels")
@RequiredArgsConstructor
public class HotelSearchController {

    private final HotelSearchService hotelSearchService;

    @GetMapping("/search")
    public List<HotelSearchResultDto> searchHotels(
            @RequestParam(defaultValue = "인천광역시") String region,
            @RequestParam(defaultValue = "1") Integer adultCount,
            @RequestParam(defaultValue = "0") Integer childCount,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Double minRating
    ) {
        int totalGuests = adultCount + childCount;
        return hotelSearchService.searchHotels(region, totalGuests, checkIn, checkOut, sortBy, minPrice, maxPrice, minRating);
    }
}
