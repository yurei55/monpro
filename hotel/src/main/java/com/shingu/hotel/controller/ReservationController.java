package com.shingu.hotel.controller;

import com.shingu.hotel.dto.MyPageReservationDto;
import com.shingu.hotel.dto.ReservationRequestDto;
import com.shingu.hotel.dto.ReservationResponseDto;
import com.shingu.hotel.entity.JoinMembershipEntity;
import com.shingu.hotel.entity.ReservationEntity;
import com.shingu.hotel.service.ReservationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

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

    @GetMapping("/{id}")
    public ResponseEntity<ReservationEntity> getReservation(@PathVariable Long id) {
        return ResponseEntity.ok(reservationService.getReservationById(id));
    }

    @GetMapping("/my")
    public ResponseEntity<List<MyPageReservationDto>> getMyReservations(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            return ResponseEntity.status(401).build();
        }

        JoinMembershipEntity user = (JoinMembershipEntity) session.getAttribute("user");
        List<MyPageReservationDto> reservations = reservationService.getReservationsByUser(user.getId());

        return ResponseEntity.ok(reservations);
    }

    // ✅ 예약 취소 + 결제 취소
    @DeleteMapping("/cancel/{reservationId}")
    public ResponseEntity<String> cancelReservation(@PathVariable Long reservationId) {
        try {
            reservationService.cancelReservation(reservationId);
            return ResponseEntity.ok("예약 및 결제가 성공적으로 취소되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("예약 취소 중 오류 발생");
        }
    }
}
