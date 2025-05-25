// src/pages/PaymentPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HotelCard from "../components/HotelCard";

export default function PaymentPage() {
  // 이전 페이지에서 넘겨준 state: hotel 객체와 체크인/아웃 날짜
  const { hotel, checkInDate, checkOutDate, guests } = useLocation().state;
  const navigate = useNavigate();
  // 로그인 체크
  useEffect(() => {
      const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    alert("로그인이 필요합니다.");
    navigate("/login");
  }
}, [navigate]);

  // 숙박 일수 계산
  const nights = Math.ceil(
    (new Date(checkOutDate) - new Date(checkInDate)) /
      (1000 * 60 * 60 * 24)
  );

  // 폼 상태
  const storedUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  const [email]    = useState(storedUser.email || "");  // 로그인한 회원 이메일
  const [name, setName]     = useState("");
  const [phone, setPhone]   = useState("");
  const [address, setAddress] = useState("");
  const [requests, setRequests] = useState("");

  const handlePay = () => {
    // 간단히 필수 입력 체크
    if (!name || !phone || !address) {
      alert("이름·휴대폰·주소는 필수 입력입니다.");
      return;
    }

    // 기존 예약 목록에 추가
    const reservations =
      JSON.parse(localStorage.getItem("reservations") || "[]");
    reservations.push({
      id:        Date.now(),        // 임시 키
      hotel,
      checkInDate,
      checkOutDate,
      guests,
      nights,
      total:     hotel.price * nights,
      contact: { email, name, phone, address, requests },
    });
    localStorage.setItem("reservations", JSON.stringify(reservations));

    // 결제 완료 페이지로 이동
    navigate("/confirmation");
  };

  return (
    <div className="container my-4">
      <div className="row gx-4">
        {/* 좌측: 결제 폼 */}
        <div className="col-md-7">
          <h4 className="mb-3">결제 정보</h4>

          <div className="mb-3">
            <label className="form-label">이메일</label>
            <input
              type="email"
              className="form-control"
              value={email}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label">이름 <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">휴대폰 <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">주소 <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">요청 사항</label>
            <textarea
              className="form-control"
              rows="4"
              value={requests}
              onChange={(e) => setRequests(e.target.value)}
            />
          </div>
        </div>

        {/* 우측: 예약 요약 및 총액 */}
        <div className="col-md-5">
          <h5>예약 정보</h5>
          <p>
            {checkInDate} <strong>~</strong> {checkOutDate} ({nights}박)
          </p>

          <HotelCard
            id={hotel.id}
            name={hotel.name}
            price={hotel.price}
            imageUrl={hotel.imageUrl}
          />

          <div className="mt-3 p-3 bg-light text-center">
            <p className="mb-2">총 숙박비</p>
            <h4>{(hotel.price * nights).toLocaleString()} 원</h4>
          </div>

          <button
            className="btn btn-primary w-100 mt-3"
            onClick={handlePay}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
