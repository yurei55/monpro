package com.shingu.hotel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Getter
@Setter
public class PaymentEntity {

    @Id
    private String id; // UUID

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservation_id")
    private ReservationEntity reservation;

    @Column(name = "payment_method")
    private String paymentMethod; // 예: CARD, KAKAOPAY, CANCELLED

    @Column(name = "paid_at")
    private LocalDateTime paidAt;

    @Column(name = "amount_paid")
    private int amountPaid;

    @Column(name = "status")
    private String status = "PAID"; // PAID, CANCELLED
}
