import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import SearchSection from "../components/SearchSection";
import "./HotelDetailPage.css";

export default function HotelDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [rating, setRating] = useState(0); // 별점
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState({
    rooms: 1,
    adults: 1,
    children: 0,
  });

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`/hotels/${Number(id)}`);
        const hotelData = response.data;

        if (!hotelData.rooms || hotelData.rooms.length === 0) {
          hotelData.rooms = [
            {
              id: 1,
              name: "스탠다드 더블룸",
              capacity: 2,
              price: 120000,
              imageUrl: "/puhaha.png",
            },
            {
              id: 2,
              name: "디럭스 패밀리룸",
              capacity: 4,
              price: 200000,
              imageUrl: "/puhaha.png",
            },
          ];
        }

        setHotel(hotelData);
        setRating(hotelData.rating);
      } catch (err) {
        console.error("호텔 정보를 불러오지 못했습니다:", err);
      }
    };

    fetchHotel();
  }, [id, navigate]);

  const getMapUrl = (lat, lng) => {
    return `https://www.google.com/maps?q=${lat},${lng}&hl=ko&z=15&output=embed`;
  };

  if (!hotel) return <div className="container">불러오는 중...</div>;

  return (
      <>
        <SearchSection
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            setCheckInDate={setCheckInDate}
            setCheckOutDate={setCheckOutDate}
            guests={guests}
            setGuests={setGuests}
        />

        <div className="container my-4">
          {/* 대표 이미지 및 이름 */}
          <img
              src={`https://teama-leemw-s3.s3.ap-northeast-3.amazonaws.com/hotel/img/${hotel.id}.jpg`}
              onError={(e) => {
                if (!e.target.src.includes("default.jpg")) {
                  e.target.src = "/default.jpg";
                }
              }}
              alt={hotel.hotelName}
              className="hotel-main-image mb-3"
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                backgroundColor: "#f8f8f8",
              }}
          />
          <h2>{hotel.hotelName}</h2>

          {/* 객실 목록 */}
          <div className="room-list my-4">
            {hotel.rooms.map((room) => {
              const nights =
                  (new Date(checkOutDate) - new Date(checkInDate)) /
                  (1000 * 60 * 60 * 24);
              const totalPrice = room.price * nights;

              return (
                  <div className="card room-card mb-3" key={room.id}>
                    <div className="row g-0 align-items-center">
                      <div className="col-md-3">
                        <img
                            src={room.imageUrl || "/puhaha.png"}
                            className="img-fluid rounded-start"
                            alt={room.name}
                        />
                      </div>
                      <div className="col-md-6">
                        <div className="card-body">
                          <h5 className="card-title">{room.name}</h5>
                          <p className="card-text mb-1">
                            숙박 가능 인원: {room.capacity}명
                          </p>
                          <p className="card-text">
                            1박 요금: {room.price.toLocaleString()}원
                          </p>
                          {nights > 0 && (
                              <p className="card-text">
                                총 {nights}박:{" "}
                                <strong>{totalPrice.toLocaleString()}원</strong>
                              </p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-3 text-center">
                        <button
                            className="btn btn-primary mb-2"
                            onClick={() =>
                                navigate("/payment", {
                                  state: {
                                    hotel,
                                    room,
                                    checkInDate,
                                    checkOutDate,
                                    guests,
                                  },
                                })
                            }
                        >
                          예약하기
                        </button>
                        <div className="rating">
                      <span className="me-1">
                        {"★".repeat(Math.floor(rating))}
                        {rating % 1 >= 0.5 ? "½" : ""}
                        {"☆".repeat(5 - Math.ceil(rating))}
                      </span>
                          <Link to="#reviews" className="small">
                            상세 리뷰 보기
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>

          {/* 구글 지도 */}
          {hotel.latitude && hotel.longitude && (
              <div className="map-container mb-5">
                <iframe
                    src={getMapUrl(hotel.latitude, hotel.longitude)}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="호텔 위치"
                ></iframe>
              </div>
          )}
        </div>
      </>
  );
}
