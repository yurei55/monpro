// HotelDetailDto.java
package com.shingu.hotel.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class HotelDetailDto {
    private Long id;
    private String gradingAgency;
    private String type;
    private String level;
    private String gradingDay;
    private String region;
    private String hotelName;
    private String numberOfRooms;
    private String address;
    private String hotelNumber;
    private String homePage;
    private String latitude;
    private String longitude;
    private String rating;

    private List<RoomDto> rooms;
}


