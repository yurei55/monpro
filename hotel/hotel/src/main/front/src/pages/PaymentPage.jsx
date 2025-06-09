import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const { hotel, room, checkInDate, checkOutDate, guests } = useLocation().state;
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [navigate]);

  const nights = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
  );

  const storedUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  const [email] = useState(storedUser.email || "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [requests, setRequests] = useState("");

  const handlePay = () => {
    if (!name || !phone || !address) {
      alert("이름·휴대폰·주소는 필수 입력입니다.");
      return;
    }

    const reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
    reservations.push({
      id: Date.now(),
      hotel,
      room,
      checkInDate,
      checkOutDate,
      guests,
      nights,
      total: room.price * nights,
      contact: { email, name, phone, address, requests },
    });
    localStorage.setItem("reservations", JSON.stringify(reservations));

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
              <input type="email" className="form-control" value={email} disabled />
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

          {/* 우측: 예약 요약 */}
          <div className="col-md-5">
            <h5>예약 정보</h5>
            <p>
              {checkInDate} <strong>~</strong> {checkOutDate} ({nights}박)
            </p>

            <div className="card mb-3">
              <img
                  src={room.imageUrl || "/puhaha.png"}
                  className="card-img-top"
                  alt={room.name}
                  style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{hotel.hotelName}</h5>
                <p className="card-text">{room.name}</p>
                <p className="card-text">
                  1박 요금: {room.price.toLocaleString()}원
                </p>
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
