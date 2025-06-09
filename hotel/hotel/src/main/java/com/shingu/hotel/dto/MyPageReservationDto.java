package com.shingu.hotel.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@JsonPropertyOrder({
        "userName",
        "hotelName",
        "roomType",
        "numberOfGuests",
        "checkInDate",
        "checkOutDate",
        "amountPaid"
})
public class MyPageReservationDto {
    private String hotelName;
    private String roomType;
    private String userName;
    private int numberOfGuests;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    @JsonIgnore //무시
    private int amountPaid;
    private String formattedAmountPaid; //포맷팅된 가격
}
