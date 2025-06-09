//결제 정보를 데이터베이스에 저장하는 엔티티 클래스
package com.shingu.hotel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class    PaymentEntity {

    @Id
    private String id; //결제 고유 id

    @OneToOne
    @JoinColumn(name = "reservation_id")
    private ReservationEntity reservation; //예약 하나에 결제 하나 연결 구조

    private String paymentMethod; // 결제 수단
    private int amountPaid; // 결제 금액
    private LocalDateTime paidAt; //결제가 이루어진 시각
}