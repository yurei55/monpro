package com.shingu.hotel.controller;

import com.shingu.hotel.dto.MyPageReservationDto;
import com.shingu.hotel.dto.ReservationRequestDto;
import com.shingu.hotel.dto.ReservationResponseDto;
import com.shingu.hotel.entity.ReservationEntity;
import com.shingu.hotel.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    // ✅ 예약 생성
    @PostMapping("/create")
    public ResponseEntity<ReservationResponseDto> reserve(@RequestBody ReservationRequestDto dto) {
        ReservationEntity reservation = reservationService.reserveAndPay(dto);

        ReservationResponseDto response = new ReservationResponseDto();
        response.setReservationId(reservation.getId());
        response.setStatus("SUCCESS");
        response.setMessage("예약 및 결제가 완료되었습니다.");
        response.setHotelName(reservation.getHotelName());
        response.setRoomType(reservation.getRoomType());
        response.setUserName(reservation.getUserName());
        response.setCheckInDate(reservation.getCheckInDate());
        response.setCheckOutDate(reservation.getCheckOutDate());
        response.setNumberOfGuests(reservation.getNumberOfGuests());

        return ResponseEntity.ok(response);
    }

    // ✅ 예약 상세 조회 (ID 기준)
    @GetMapping("/{id}")
    public ResponseEntity<ReservationEntity> getReservation(@PathVariable Long id) {
        ReservationEntity reservation = reservationService.getReservationById(id);
        return ResponseEntity.ok(reservation);
    }

    // ✅ 마이페이지 - 로그인한 사용자의 예약 목록 조회
    @GetMapping("/my")
    public ResponseEntity<List<MyPageReservationDto>> getMyReservations(@RequestParam Long userId) {
        List<MyPageReservationDto> reservations = reservationService.getReservationsByUser(userId);
        return ResponseEntity.ok(reservations);


    }


}

