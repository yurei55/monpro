import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();
  const locationState = useLocation().state || {};
  const hotel = locationState.hotel || {};
  const room = locationState.room || {};
  const checkInDate = locationState.checkInDate || "";
  const checkOutDate = locationState.checkOutDate || "";
  const guests = locationState.guests || { adults: 0, children: 0 };


  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
    if (!hotel || !room || !hotel.id || !room.id) {
      alert("잘못된 접근입니다. 호텔 정보를 다시 선택해주세요.");
      navigate("/");
    }
  }, [navigate, hotel, room]);

  const nights = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
  );

  const storedUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  const [email] = useState(storedUser.email || "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [requests, setRequests] = useState("");
  const userId = storedUser.id; // userId 추가

  const handlePay = async () => {
    const reservationRequest = {
      userId, // ✅ 필수!
      hotelId: hotel.id,
      roomId: room.id,
      checkInDate,
      checkOutDate,
      numberOfGuests: guests.adults + guests.children, // ✅ 백엔드에서는 numberOfGuests 사용
      paymentMethod: "CARD" // 기본 결제 방식 지정 (혹은 선택 가능하게 수정 가능)
    };

    console.log("📦 보내는 예약 데이터:", reservationRequest);

    try {
      const response = await fetch("/api/reservations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationRequest),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      alert("예약이 완료되었습니다!");
      navigate("/");
    } catch (error) {
      console.error("예약 요청 실패:", error);
      alert(error.message || "예약 요청 중 오류가 발생했습니다.");
    }
  };



  return (
      <div className="container my-4">
        <div className="row gx-4">
          <div className="col-md-7">
            <h4 className="mb-3">결제 정보</h4>

            <div className="mb-3">
              <label className="form-label">이메일</label>
              <input type="email" className="form-control" value={email} disabled />
            </div>

            <div className="mb-3">
              <label className="form-label">이름 <span className="text-danger">*</span></label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label">휴대폰 <span className="text-danger">*</span></label>
              <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label">주소 <span className="text-danger">*</span></label>
              <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label">요청 사항</label>
              <textarea className="form-control" rows="4" value={requests} onChange={(e) => setRequests(e.target.value)} />
            </div>
          </div>

          <div className="col-md-5">
            <h5>예약 정보</h5>
            <p>
              {checkInDate} <strong>~</strong> {checkOutDate} ({nights}박)
            </p>

            <div className="card mb-3">
              <img
                  src={`https://teama-leemw-s3.s3.ap-northeast-3.amazonaws.com/room/img/165.jpg`}
                  className="card-img-top"
                  alt={room.roomType}
                  style={{ height: "200px", objectFit: "cover"}}
              />
              <div className="card-body">
                <h5 className="card-title">{hotel.hotelName}</h5>
                <p className="card-text">{room.roomType}</p>
                <p className="card-text">1박 요금: {room.price.toLocaleString()}원</p>
                <p className="card-text">
                  총 {nights}박: <strong>{(room.price * nights).toLocaleString()}원</strong>
                </p>
              </div>
            </div>

            <button className="btn btn-primary w-100 mt-3" onClick={handlePay}>
              결제하기
            </button>
          </div>
        </div>
      </div>
  );
}
