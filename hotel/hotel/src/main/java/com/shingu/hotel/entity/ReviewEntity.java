package com.shingu.hotel.entity;

import jakarta.persistence.*;
import lombok.*;
import com.shingu.hotel.entity.HotelEntity;
import com.shingu.hotel.entity.RoomEntity;
import com.shingu.hotel.entity.JoinMembershipEntity;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private HotelEntity hotel;

    @ManyToOne
    private RoomEntity room;

    @ManyToOne
    private JoinMembershipEntity member;

    private double rating;       // 별점 1~5
    private String content;   // 리뷰 내용

    public ReviewEntity(HotelEntity hotel, RoomEntity room, JoinMembershipEntity member, int rating, String content) {
        this.hotel = hotel;
        this.room = room;
        this.member = member;
        this.rating = rating;
        this.content = content;
    }
}
