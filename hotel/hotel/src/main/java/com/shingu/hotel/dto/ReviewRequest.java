package com.shingu.hotel.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRequest {
    private String hotelName;
    private String roomType;
    private String memberName;
    private double rating;
    private String content;
}
