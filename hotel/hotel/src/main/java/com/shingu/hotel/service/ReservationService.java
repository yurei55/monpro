package com.shingu.hotel.service;

import com.shingu.hotel.dto.MyPageReservationDto;
import com.shingu.hotel.dto.ReservationRequestDto;
import com.shingu.hotel.entity.JoinMembershipEntity;
import com.shingu.hotel.entity.PaymentEntity;
import com.shingu.hotel.entity.ReservationEntity;
import com.shingu.hotel.entity.RoomEntity;
import com.shingu.hotel.repository.PaymentRepository;
import com.shingu.hotel.repository.ReservationRepository;
import com.shingu.hotel.repository.RoomRepository;
import com.shingu.hotel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepo;
    private final PaymentRepository paymentRepo;
    private final RoomRepository roomRepo;
    private final UserRepository userRepo; // ✅ 사용자 정보 조회용 추가

    public ReservationEntity getReservationById(Long id) {
        return reservationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("예약 정보를 찾을 수 없습니다."));
    }

    public ReservationEntity reserveAndPay(ReservationRequestDto dto) {
        // 🔹 객실 조회
        RoomEntity room = roomRepo.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("객실을 찾을 수 없습니다."));

        // 🔹 사용자 조회
        JoinMembershipEntity user = userRepo.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // ✅ 인원수 검증
        if (dto.getNumberOfGuests() > room.getMaxOccupancy()) {
            throw new IllegalArgumentException("해당 객실은 최대 " + room.getMaxOccupancy() + "명까지 예약할 수 있습니다.");
        }

        // ✅ 예약 상태 변경
        room.setReservationStatus("예약 완료");
        roomRepo.save(room);  // 상태 변경 저장

        // ✅ 숙박 일수 계산
        long days = java.time.temporal.ChronoUnit.DAYS.between(dto.getCheckInDate(), dto.getCheckOutDate());
        if (days <= 0) {
            throw new IllegalArgumentException("체크아웃 날짜는 체크인 날짜보다 이후여야 합니다.");
        }

        // ✅ 결제 금액 계산 (가격 * 일수)
        double amountPaid = room.getPrice() * days;

        // 🔹 예약 정보 생성
        ReservationEntity reservation = new ReservationEntity();
        reservation.setUserId(dto.getUserId());
        reservation.setRoom(room);
        reservation.setCheckInDate(dto.getCheckInDate());
        reservation.setCheckOutDate(dto.getCheckOutDate());
        reservation.setNumberOfGuests(dto.getNumberOfGuests());

        reservation.setHotelName(room.getHotel().getHotelName());
        reservation.setRoomType(room.getRoomType());
        reservation.setUserName(user.getName());

        reservationRepo.save(reservation);

        // 🔹 결제 정보 생성
        PaymentEntity payment = new PaymentEntity();
        payment.setId(UUID.randomUUID().toString());
        payment.setReservation(reservation);
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setPaidAt(LocalDateTime.now());
        payment.setAmountPaid((int) Math.round(amountPaid)); // 소수점 반올림해서 정수로 저장

        paymentRepo.save(payment);

        return reservation;
    }
    public List<MyPageReservationDto> getReservationsByUser(Long userId) {
        List<ReservationEntity> reservations = reservationRepo.findByUserId(userId);

        return reservations.stream().map(reservation -> {
            MyPageReservationDto dto = new MyPageReservationDto();
            dto.setHotelName(reservation.getHotelName());
            dto.setRoomType(reservation.getRoomType());
            dto.setUserName(reservation.getUserName());
            dto.setNumberOfGuests(reservation.getNumberOfGuests());
            dto.setCheckInDate(reservation.getCheckInDate());
            dto.setCheckOutDate(reservation.getCheckOutDate());

            // ✅ 결제 금액 처리
            if (reservation.getPayment() != null) {
                int amount = reservation.getPayment().getAmountPaid();
                dto.setAmountPaid(amount);

                // 👉 금액 포맷해서 문자열로 저장 (₩ 포함)
                NumberFormat formatter = NumberFormat.getInstance(Locale.KOREA);
                String formatted = "₩" + formatter.format(amount);
                dto.setFormattedAmountPaid(formatted); // 🔁 새 필드로 응답
            } else {
                dto.setAmountPaid(0);
                dto.setFormattedAmountPaid("₩0");
            }
            return dto;
        }).collect(Collectors.toList());
    }


}
