import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ReservationPage() {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    axios
        .get("/api/reservations/my", { withCredentials: true })
        .then((res) => {
          // ✅ status가 CANCELLED가 아닌 예약만 보여줌
          const filtered = res.data.filter((r) => r.status !== "CANCELLED");
          setReservations(filtered);
        })
        .catch((err) => {
          console.error("예약 정보 불러오기 실패:", err);
          setReservations([]);
        });
  }, [navigate]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleCancel = async (reservationId) => {
    if (!window.confirm("정말 이 예약을 취소하시겠습니까?")) return;

    try {
      await axios.delete(`/api/reservations/cancel/${reservationId}`);
      alert("예약이 성공적으로 취소되었습니다.");
      // ✅ 취소한 예약은 목록에서 제거
      setReservations((prev) => prev.filter((r) => r.reservationId !== reservationId));
    } catch (error) {
      console.error("예약 취소 실패:", error);
      alert("예약 취소에 실패했습니다.");
    }
  };

  if (reservations.length === 0) {
    return (
        <div className="text-center my-5">
          <h5>아직 예약된 호텔이 없습니다.</h5>
        </div>
    );
  }

  return (
      <div className="container my-4">
        {reservations.map((res, index) => {
          const s3ImageUrl = `https://teama-leemw-s3.s3.ap-northeast-3.amazonaws.com/hotel/img/${res.hotelId || 0}.jpg`;

          return (
              <div className="card mb-3" key={index} style={{ height: "200px" }}>
                <div className="row g-0 h-100">
                  <div className="col-md-3 h-100">
                    <img
                        src={s3ImageUrl}
                        alt={res.hotelName}
                        className="img-fluid h-100 w-100"
                        style={{ objectFit: "cover" }}
                        onError={(e) => {
                          if (!e.target.src.includes("default.jpg")) {
                            e.target.src = "/default.jpg";
                          }
                        }}
                    />
                  </div>
                  <div className="col-md-7 d-flex flex-column justify-content-center h-100">
                    <div className="card-body">
                      <h5 className="card-title">
                        {res.hotelName} - {res.roomType}
                      </h5>
                      <p className="card-text">
                        {formatDate(res.checkInDate)} ~ {formatDate(res.checkOutDate)}
                      </p>
                      <p className="card-text">인원수: {res.numberOfGuests}명</p>
                      <p className="card-text fw-bold text-primary">
                        <strong>{res.total}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-2 d-flex align-items-center justify-content-center h-100">
                    <button
                        className="btn btn-danger"
                        onClick={() => handleCancel(res.reservationId)}
                    >
                      예약취소
                    </button>
                  </div>
                </div>
              </div>
          );
        })}
      </div>
  );
}

export default ReservationPage;
