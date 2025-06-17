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
import org.springframework.transaction.annotation.Transactional;

import java.text.NumberFormat;
import java.time.LocalDate;
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
    private final UserRepository userRepo;

    public ReservationEntity getReservationById(Long id) {
        return reservationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("예약 정보를 찾을 수 없습니다."));
    }

    public ReservationEntity reserveAndPay(ReservationRequestDto dto) {
        RoomEntity room = roomRepo.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("객실을 찾을 수 없습니다. ID: " + dto.getRoomId()));

        JoinMembershipEntity user = userRepo.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다. ID: " + dto.getUserId()));

        if (dto.getNumberOfGuests() > room.getMaxOccupancy()) {
            throw new IllegalArgumentException("해당 객실은 최대 " + room.getMaxOccupancy() + "명까지 예약할 수 있습니다.");
        }

        room.setReservationStatus("예약 완료");
        roomRepo.save(room);

        if (dto.getCheckInDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("체크인 날짜는 오늘 이후여야 합니다.");
        }

        long days = java.time.temporal.ChronoUnit.DAYS.between(dto.getCheckInDate(), dto.getCheckOutDate());
        if (days <= 0) {
            throw new IllegalArgumentException("체크아웃 날짜는 체크인보다 이후여야 합니다.");
        }

        double amountPaid = room.getPrice() * days;

        ReservationEntity reservation = new ReservationEntity();
        reservation.setUser(user);
        reservation.setRoom(room);
        reservation.setCheckInDate(dto.getCheckInDate());
        reservation.setCheckOutDate(dto.getCheckOutDate());
        reservation.setNumberOfGuests(dto.getNumberOfGuests());
        reservation.setHotelName(room.getHotel().getHotelName());
        reservation.setRoomType(room.getRoomType());
        reservation.setUserName(user.getName());

        reservationRepo.save(reservation);

        PaymentEntity payment = new PaymentEntity();
        payment.setId(UUID.randomUUID().toString());
        payment.setReservation(reservation);
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setPaidAt(LocalDateTime.now());
        payment.setAmountPaid((int) Math.round(amountPaid));

        paymentRepo.save(payment);

        return reservation;
    }

    public List<MyPageReservationDto> getReservationsByUser(Long userId) {
        return reservationRepo.findByUser_Id(userId).stream().map(reservation -> {
            MyPageReservationDto dto = new MyPageReservationDto();
            dto.setReservationId(reservation.getId()); // 🔥 여기에 추가
            dto.setHotelName(reservation.getHotelName());
            dto.setRoomType(reservation.getRoomType());
            dto.setHotelId(reservation.getRoom().getHotel().getId());
            dto.setUserName(reservation.getUserName());
            dto.setNumberOfGuests(reservation.getNumberOfGuests());
            dto.setCheckInDate(reservation.getCheckInDate());
            dto.setCheckOutDate(reservation.getCheckOutDate());

            int amount = (reservation.getPayment() != null)
                    ? reservation.getPayment().getAmountPaid()
                    : 0;
            dto.setAmountPaid(amount);
            dto.setTotal("₩" + NumberFormat.getInstance(Locale.KOREA).format(amount));

            dto.setStatus(reservation.getStatus());

            return dto;
        }).collect(Collectors.toList());
    }

    // ✅ 예약 + 결제 취소 메서드
    @Transactional
    public void cancelReservation(Long reservationId) {
        ReservationEntity reservation = reservationRepo.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("해당 예약을 찾을 수 없습니다."));

        // ✅ 예약 상태를 CANCELLED로 변경
        reservation.setStatus("CANCELLED");

        // ✅ 여기 추가: 객실 상태 변경
        RoomEntity room = reservation.getRoom();
        if (room != null) {
            room.setReservationStatus("예약 가능");
        }

        // ✅ 결제 취소 처리
        PaymentEntity payment = reservation.getPayment();
        if (payment != null) {
            payment.setPaymentMethod("CANCELLED");
        }

        // ✅ 반드시 저장해야 변경 사항이 반영됨
        reservationRepo.save(reservation);
    }

}
