package com.shingu.hotel.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HotelSummaryDto {
    private Long hotelId;
    private String hotelName;
    private double rating;
    private String region;
    private String imageUrl;
}
