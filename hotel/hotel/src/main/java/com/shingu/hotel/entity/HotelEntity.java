package com.shingu.hotel.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shingu.hotel.entity.RoomEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HotelEntity {

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String gradingAgency; // 등급 인정처
    private String type;          // 호텔업 종류
    private String level;         // 결정 등급
    private String gradingDay;    // 등급 결정일
    private String region;        // 지역
    private String hotelName;     // 호텔명
    private String numberOfRooms; // 총 객실 수
    private String address;       // 주소
    private String hotelNumber;   // 전화번호
    private String homePage;      // 홈페이지
    private String latitude;      // 위도
    private String longitude;     // 경도
    private double rating;        // 평점
    private String imageUrl;


    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL)
    @JsonIgnore //호텔정보 나올때 객실 정보가 같이 안나오게 하기
    private List<RoomEntity> rooms;  // 객실 리스트 (1:N)
}
