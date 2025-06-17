package com.shingu.hotel.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@JsonPropertyOrder({
        "reservationId",       // ✅ 새로 추가됨
        "hotelId",
        "userName",
        "hotelName",
        "roomType",
        "numberOfGuests",
        "checkInDate",
        "checkOutDate",
        "total",
        "status" // ✅ 예약 상태도 응답에 포함
})
public class MyPageReservationDto {

    @JsonProperty("reservationId")   // ✅ JSON 응답에 포함되도록 명시
    private Long reservationId;

    private Long hotelId;
    private String hotelName;
    private String roomType;
    private String userName;
    private int numberOfGuests;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    @JsonIgnore // 서버에서 amountPaid는 숨기되, total은 표시
    private int amountPaid;

    private String total; // ₩포맷된 금액

    private String status;
}
