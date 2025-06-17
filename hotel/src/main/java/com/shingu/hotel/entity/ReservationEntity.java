package com.shingu.hotel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "reservations")
@Getter
@Setter
public class ReservationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private JoinMembershipEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private RoomEntity room;

    @Column(name = "check_in_date")
    private LocalDate checkInDate;

    @Column(name = "check_out_date")
    private LocalDate checkOutDate;

    @Column(name = "number_of_guests")
    private int numberOfGuests;

    @Column(name = "hotel_name")
    private String hotelName;

    @Column(name = "room_type")
    private String roomType;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "status")
    private String status = "CONFIRMED"; // 예약 상태: CONFIRMED, CANCELLED 등

    @OneToOne(mappedBy = "reservation", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private PaymentEntity payment;
}
