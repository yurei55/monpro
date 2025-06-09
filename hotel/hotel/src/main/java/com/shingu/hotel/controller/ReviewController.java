package com.shingu.hotel.controller;

import com.shingu.hotel.dto.ReviewRequest;
import com.shingu.hotel.entity.*;
import com.shingu.hotel.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;
    private final JoinMemberShipRepository memberRepository;

    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody ReviewRequest request) {

        HotelEntity hotel = hotelRepository.findByHotelName(request.getHotelName())
                .orElseThrow(() -> new RuntimeException("호텔을 찾을 수 없습니다."));

        RoomEntity room = roomRepository.findByRoomTypeAndHotelId(request.getRoomType(), hotel.getId())
                .orElseThrow(() -> new RuntimeException("객실을 찾을 수 없습니다."));

        JoinMembershipEntity member = memberRepository.findByName(request.getMemberName())
                .orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));

        ReviewEntity review = new ReviewEntity(hotel, room, member, (int) request.getRating(), request.getContent());
        reviewRepository.save(review);

        // 평균 평점 계산
        List<ReviewEntity> reviews = reviewRepository.findByHotel(hotel);
        double avg = reviews.stream().mapToInt(reviewEntity -> (int) reviewEntity.getRating()).average().orElse(0.0);
        hotel.setRating(Math.round(avg * 10) / 10.0);  // 예: "4.3"
        hotelRepository.save(hotel);

        return ResponseEntity.ok("리뷰 등록 및 호텔 평점 갱신 완료");
    }
}
