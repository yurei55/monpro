// src/pages/HotelDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import SearchSection from "../components/SearchSection"; // 기존 검색바 재사용
import "./HotelDetailPage.css"; // 아래의 CSS를 이 파일과 같은 폴더에 만들어 주세요

export default function HotelDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [rating, setRating] = useState(4.3); // 예시 별점
  const [checkInDate, setCheckInDate]   = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests]             = useState({
    rooms: 1,
    adults: 1,
    children: 0,
  });

  // 1) URL param으로 hotelId 받아서 mock 데이터 로드
  useEffect(() => {
    // TODO: 실제 API 호출로 교체
    const mockHotel = {
      id: 1,
      name:        "그랜드 서울 호텔",
      imageUrl:    "/hotelimg/grand_seoul.jpg",
      address:     "서울특별시 중구 세종대로 110",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!…", 
    };
    setHotel(mockHotel);

    // room 옵션 예시
    setRooms([
      {
        id: "r1",
        name: "스위트룸",
        capacity: 2,
        price: 250000,
        imageUrl: "/hotelimg/room_suite.jpg",
      },
      {
        id: "r2",
        name: "디럭스 트윈",
        capacity: 3,
        price: 200000,
        imageUrl: "/hotelimg/room_deluxe.jpg",
      },
      {
        id: "r3",
        name: "스탠다드 퀸",
        capacity: 2,
        price: 150000,
        imageUrl: "/hotelimg/room_standard.jpg",
      },
    ]);

    // TODO: 기존 SearchSection 상태 가져오기
    const today     = new Date().toISOString().split("T")[0];
    const tomorrow  = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    setCheckInDate(today);
    setCheckOutDate(tomorrow);
    setGuests({ rooms: 1, adults: 2, children: 0 });
  }, [id]);

  if (!hotel) {
    return <div className="container my-5 text-center">로딩 중…</div>;
  }

  return (
    <>
      <Header />

      {/* 2) 검색바: 읽기 전용으로 prop 전달해서 재사용 */}
      <SearchSection
        initialCheckIn={checkInDate}
        initialCheckOut={checkOutDate}
        initialGuests={guests}
        readOnly
      />

      <div className="container my-4">
        {/* 호텔 대표 이미지 & 이름 */}
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className="hotel-main-image mb-3"
        />
        <h2>{hotel.name}</h2>

        {/* 객실 정보 카드 리스트 */}
        <div className="room-list my-4">
          {rooms.map((room) => {
            const nights =
              (new Date(checkOutDate) - new Date(checkInDate)) /
              (1000 * 60 * 60 * 24);
            const totalPrice = room.price * nights;

            return (
              <div className="card room-card mb-3" key={room.id}>
                <div className="row g-0 align-items-center">
                  {/* 왼쪽 사진 */}
                  <div className="col-md-3">
                    <img
                      src={room.imageUrl}
                      className="img-fluid rounded-start"
                      alt={room.name}
                    />
                  </div>
                  {/* 중간 방 정보 */}
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title">{room.name}</h5>
                      <p className="card-text mb-1">
                        숙박 가능 인원: {room.capacity}명
                      </p>
                      <p className="card-text">
                        1박 요금: {room.price.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                  {/* 우측 예약 버튼 + 별점 */}
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
                      {/* ★★★★☆ 스타일로 표시 */}
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

        {/* 3) 구글 지도 임베드 */}
        <div className="map-container mb-5">
          <iframe
            src={hotel.mapEmbedUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="호텔 위치"
          ></iframe>
        </div>
      </div>
    </>
  );
}
