package com.shingu.hotel.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRequest {
    private String hotelName;
    private Long roomId;
    private String memberName;
    private String memberEmail;
    private double rating;
    private String title;
    private String content;
}
