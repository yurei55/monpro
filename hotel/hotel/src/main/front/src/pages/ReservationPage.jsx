import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function ReservationPage() {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [navigate]);

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
        {reservations.map((res, index) => {
          const hotelId = res.hotel?.id || res.hotel?.hotelId || 0;
          const s3ImageUrl = `https://teama-leemw-s3.s3.ap-northeast-3.amazonaws.com/hotel/img/${hotelId}.jpg`;

          return (
              <div className="card mb-3" key={index} style={{ height: "200px" }}>
                <div className="row g-0 h-100">
                  <div className="col-md-3 h-100">
                    <img
                        src={s3ImageUrl}
                        alt={res.hotel?.hotelName}
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
                      <h5 className="card-title">{res.hotel?.hotelName}</h5>
                      <p className="card-text">
                        {formatDate(res.checkInDate)} ~ {formatDate(res.checkOutDate)}
                      </p>
                      <p className="card-text fw-bold text-primary">
                        <strong>{res.total.toLocaleString()} 원</strong>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-2 d-flex align-items-center justify-content-center h-100">
                    <button
                        className="btn btn-danger"
                        onClick={() => handleCancel(index)}
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
