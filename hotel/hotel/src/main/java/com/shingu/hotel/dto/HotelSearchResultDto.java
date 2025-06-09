package com.shingu.hotel.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HotelSearchResultDto {
    private Long hotelId;
    private String hotelName;
    private String region;
    private String imageUrl;
    private double price;// ✅ 정렬에 사용됨
    private double rating;
    private double minPrice;     // ✅ 추가
    private double maxPrice;     // ✅ 추가
    private boolean soldOut;
}
