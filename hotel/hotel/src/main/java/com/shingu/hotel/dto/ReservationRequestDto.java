//클라이언트(프론트엔드) → 서버로 보내는 예약 + 결제 요청 정보를 담는 **데이터 전달 객체(DTO)
//예약할 때 필요한 정보"만 보냄
package com.shingu.hotel.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReservationRequestDto {
    private Long userId; //예약자 식별 id
    private Long roomId; //객실 식별 id
    private LocalDate checkInDate; //체크인 날짜
    private LocalDate checkOutDate;//체크아웃 날짜
    private int numberOfGuests; // 인원 수

    private String paymentMethod; // 결제 방식(card,카카오페이 등등)
}