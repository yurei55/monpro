    //예약 정보를 db에 저장 할 수 있게 만들어주는 클래스
    package com.shingu.hotel.entity;

    import jakarta.persistence.*;
    import lombok.Getter;
    import lombok.Setter;

    import java.time.LocalDate;

    @Entity
    @Getter
    @Setter
    public class ReservationEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY) //db에서 auto_increment로 값이 자동 증가
        private Long id; //예약 자체의 번호

        private Long userId; //예약자 id
        private LocalDate checkInDate; //체크인 날짜
        private LocalDate checkOutDate; //체크아웃 날짜
        private int numberOfGuests; //인원수
        @Column(nullable = false)
        private String hotelName;
        @Column(nullable = false)
        private String roomType;   // 예: "2인실"
        @Column(nullable = false)
        private String userName;   // 예약자 이름

        @OneToOne(mappedBy = "reservation", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
        private PaymentEntity payment; //예약 하나에 결제 하나가 연결됨

        @ManyToOne
        @JoinColumn(name = "room_id")
        private RoomEntity room;
    }