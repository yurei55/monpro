package com.shingu.hotel.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReservationRequestDto {

    private Long hotelId;
    private Long roomId;
    private Long userId; // ✅ 이거 반드시 필요!

    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    private int numberOfGuests;
    private String paymentMethod;
}
