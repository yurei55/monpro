import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 이거 추가

function ReservationPage() {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate(); // ✅ 이거 추가

  // ✅ 로그인 체크 useEffect
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [navigate]);

  // 예약 정보 불러오기
  useEffect(() => {
    const storedReservations = localStorage.getItem("reservations");
    if (storedReservations) {
      try {
        setReservations(JSON.parse(storedReservations));
      } catch (e) {
        console.error("Failed to parse reservations from localStorage:", e);
        setReservations([]);
      }
    }
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleCancel = (index) => {
    const updatedReservations = reservations.filter((_, i) => i !== index);
    setReservations(updatedReservations);
    localStorage.setItem("reservations", JSON.stringify(updatedReservations));
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
        {reservations.map((res, index) => (
            <div className="card mb-3" key={index}>
              <div className="row g-0 align-items-center">
                <div className="col-12 col-md-3">
                  <img
                      src={res.imageUrl}
                      alt={res.name}
                      className="img-fluid"
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                </div>
                <div className="col-12 col-md-7">
                  <div className="card-body">
                    <h5 className="card-title">{res.name}</h5>
                    <p className="card-text">
                      {formatDate(res.checkin)} ~ {formatDate(res.checkout)}
                    </p>
                    <p className="card-text">
                      <strong>{Number(res.price).toLocaleString()} 원</strong>
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-2 text-md-end text-center">
                  <button
                      className="btn btn-danger"
                      onClick={() => handleCancel(index)}
                  >
                    예약취소
                  </button>
                </div>
              </div>
            </div>
        ))}
      </div>
  );
}

export default ReservationPage;
