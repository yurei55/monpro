// 예약 및 결제가 되면 예약 결과, ID, 메시지" 등 처리 결과를 알려줌
package com.shingu.hotel.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReservationResponseDto {
    private Long reservationId; //예약 번호(마이페이지에서 내가 예약한 보기 누를때 써야하는 id값)
    private String status; //처리 결과 상태(성공,실패)
    private String message;// 사용자에게 보여줄 메시지

    // 🔽 마이페이지용 추가 정보
    private String hotelName;       // 호텔 이름
    private String roomType;        // 방 종류 ("2인실" 등)
    private String userName;        // 예약자 이름
    private LocalDate checkInDate;  // 체크인 날짜
    private LocalDate checkOutDate; // 체크아웃 날짜
    private int numberOfGuests;     // 예약 인원수
}
