package com.shingu.hotel.service;

import com.shingu.hotel.dto.HotelSearchResultDto;
import com.shingu.hotel.entity.HotelEntity;
import com.shingu.hotel.entity.ReservationEntity;
import com.shingu.hotel.entity.RoomEntity;
import com.shingu.hotel.repository.HotelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.OptionalDouble;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HotelSearchService {

    private final HotelRepository hotelRepository;

    public List<HotelSearchResultDto> searchHotels(String region,
                                                   int totalGuests,
                                                   LocalDate checkIn,
                                                   LocalDate checkOut,
                                                   String sortBy,
                                                   Double minPrice,
                                                   Double maxPrice,
                                                   Double minRating) {

        List<HotelEntity> hotels = (region == null || region.isBlank())
                ? hotelRepository.findAllWithRooms()
                : hotelRepository.findByRegionWithRooms(region);

        List<HotelSearchResultDto> result = hotels.stream()
                .map(hotel -> {
                    List<RoomEntity> availableRooms = hotel.getRooms().stream()
                            .filter(room -> isRoomAvailable(room, checkIn, checkOut))
                            .filter(room -> room.getMaxOccupancy() >= totalGuests)
                            .collect(Collectors.toList());

                    if (availableRooms.isEmpty()) return null;

                    OptionalDouble min = availableRooms.stream()
                            .mapToDouble(RoomEntity::getPrice)
                            .min();
                    OptionalDouble max = availableRooms.stream()
                            .mapToDouble(RoomEntity::getPrice)
                            .max();

                    if (min.isEmpty() || max.isEmpty()) return null;

                    return HotelSearchResultDto.builder()
                            .hotelId(hotel.getId())
                            .hotelName(hotel.getHotelName())
                            .region(hotel.getRegion())
                            .imageUrl(hotel.getImageUrl())
                            .minPrice(min.getAsDouble())
                            .maxPrice(max.getAsDouble())
                            .rating(hotel.getRating())
                            .soldOut(false)
                            .build();
                })
                .filter(dto -> dto != null)
                .filter(dto -> minPrice == null || dto.getMinPrice() >= minPrice)
                .filter(dto -> maxPrice == null || dto.getMaxPrice() <= maxPrice)
                .filter(dto -> minRating == null || dto.getRating() >= minRating)
                .collect(Collectors.toList());

        if ("lowPrice".equals(sortBy)) {
            result.sort(Comparator.comparing(HotelSearchResultDto::getMinPrice));
        } else if ("highPrice".equals(sortBy)) {
            result.sort(Comparator.comparing(HotelSearchResultDto::getMinPrice).reversed());
        } else if ("rating".equals(sortBy)) {
            result.sort(Comparator.comparing(HotelSearchResultDto::getRating).reversed());
        }

        return result;
    }

    private boolean isRoomAvailable(RoomEntity room, LocalDate checkIn, LocalDate checkOut) {
        return room.getReservations().stream().noneMatch(res ->
                !(res.getCheckOutDate().isBefore(checkIn) || res.getCheckInDate().isAfter(checkOut))
        );
    }
}
