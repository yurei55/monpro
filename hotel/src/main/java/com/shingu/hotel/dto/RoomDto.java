// RoomDto.java
package com.shingu.hotel.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomDto {
    private Long id;
    private String roomType;
    private Integer maxOccupancy;
    private Double price;
    // 편의 시설
    private String refrigerator; // 냉장고
    private String tv;  // 텔레비전
    private String heater; // 난방
    private String airConditioner; // 에어컨
    private String bathtub; // 욕조
    private String terrace; // 테라스
    private String coffeeMaker; //커피메이커
    private String internet; //인터넷
    private String washingMachine; // 세탁기
    private String ironingService; // 다림질 서비스
    private String privatePool; // 전용 수영장
    private String petFriendly; // 반려동물 동반 여부
    private String kitchen; // 주방
    private String parking; // 주차장
    private String gym; // 체육관
    private String desk24Hour; // 24시간 데스크
    private String nonSmokingRoom; // 금연객실
    private String spaSauna; // 스파/사우나
    private String restaurant; // 레스토랑
    private String smokingArea; //흡연 구역

    private String doubleBed; // 더블베드 여부
    private String queenBed; // 퀸 베드 여부
    private String singleBed; // 싱글 베드 여부

    private String reservationStatus;//예약 여부
    private String imageUrl;
}
