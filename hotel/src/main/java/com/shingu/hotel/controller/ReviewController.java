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
        System.out.println("🔔 [리뷰 요청 수신]");
        System.out.println("호텔 이름: " + request.getHotelName());
        System.out.println("roomId: " + request.getRoomId());
        System.out.println("이메일: " + request.getMemberEmail());
        System.out.println("평점: " + request.getRating());
        System.out.println("내용: " + request.getContent());

        // 호텔 조회
        HotelEntity hotel = hotelRepository.findByHotelName(request.getHotelName())
                .orElseThrow(() -> {
                    System.err.println("❌ 호텔 조회 실패");
                    return new RuntimeException("호텔을 찾을 수 없습니다.");
                });
        System.out.println("✅ 호텔 조회 성공: " + hotel.getId());

        // 객실 조회
        RoomEntity room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> {
                    System.err.println("❌ 객실 조회 실패: ID = " + request.getRoomId());
                    return new RuntimeException("객실을 찾을 수 없습니다. ID: " + request.getRoomId());
                });
        System.out.println("✅ 객실 조회 성공: " + room.getId() + " / " + room.getRoomType());

        // 회원 조회
        JoinMembershipEntity member = memberRepository.findByEmail(request.getMemberEmail())
                .orElseThrow(() -> {
                    System.err.println("❌ 회원 조회 실패");
                    return new RuntimeException("회원을 찾을 수 없습니다.");
                });
        System.out.println("✅ 회원 조회 성공: " + member.getEmail());

        // 리뷰 저장
        ReviewEntity review = new ReviewEntity(hotel, room, member, (int) request.getRating(), request.getTitle(), request.getContent());
        reviewRepository.save(review);
        System.out.println("✅ 리뷰 저장 완료");

        // 평균 평점 갱신
        List<ReviewEntity> reviews = reviewRepository.findByHotel(hotel);
        double avg = reviews.stream().mapToDouble(ReviewEntity::getRating).average().orElse(0.0);
        hotel.setRating(Math.round(avg * 10) / 10.0);
        hotelRepository.save(hotel);
        System.out.println("✅ 호텔 평점 업데이트 완료: " + hotel.getRating());

        return ResponseEntity.ok("리뷰 등록 및 호텔 평점 갱신 완료");
    }



    // ✅ 호텔 ID로 리뷰 전체 조회
    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<?> getReviewsByHotel(@PathVariable Long hotelId) {
        HotelEntity hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("호텔을 찾을 수 없습니다."));

        List<ReviewEntity> reviews = reviewRepository.findByHotel(hotel);
        return ResponseEntity.ok(reviews);
    }
}
