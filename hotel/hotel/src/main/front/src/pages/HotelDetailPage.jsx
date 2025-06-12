// HotelDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import SearchSection from "../components/SearchSection";
import "./HotelDetailPage.css";

export default function HotelDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const passedState = location.state || {};

    const [hotel, setHotel] = useState(null);
    const [checkInDate, setCheckInDate] = useState(passedState.checkInDate || "");
    const [checkOutDate, setCheckOutDate] = useState(passedState.checkOutDate || "");
    const [guests, setGuests] = useState(
        passedState.guests || { rooms: 1, adults: 1, children: 0 }
    );

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await axios.get(`/hotels/${Number(id)}`);
                console.log("받은 호텔 데이터:", response.data); // ✅ 콘솔에서 찍기
                setHotel(response.data);
            } catch (err) {
                console.error("호텔 정보를 불러오지 못했습니다:", err);
            }
        };
        fetchHotel();
    }, [id]);

    const nights =
        checkInDate && checkOutDate
            ? (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
            : 0;

    const getMapUrl = (lat, lng) =>
        `https://www.google.com/maps?q=${lat},${lng}&hl=ko&z=15&output=embed`;

    if (!hotel) return <div className="container">불러오는 중...</div>;

    const s3ImageUrl = `https://teama-leemw-s3.s3.ap-northeast-3.amazonaws.com/hotel/img/${id}.jpg`;
    const totalGuests = (guests.adults || 0) + (guests.children || 0);

    return (
        <>
            <SearchSection
                defaultCheckIn={checkInDate}
                defaultCheckOut={checkOutDate}
                guests={guests}
                setCheckInDate={setCheckInDate}
                setCheckOutDate={setCheckOutDate}
                setGuests={setGuests}
            />


            {/* 호텔 이미지 + 지도 (2:1 비율) */}
            <div className="container">
                <div className="hotel-top-section d-flex mb-4">
                    <div className="hotel-image-container me-3 flex-grow-2" style={{ flex: 2 }}>
                        <img
                            src={s3ImageUrl}
                            className="img-fluid rounded"
                            alt={hotel.hotelName}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>

                    <div className="hotel-map-container flex-grow-1" style={{ flex: 1 }}>
                        <iframe
                            src={getMapUrl(hotel.latitude, hotel.longitude)}
                            width="100%"
                            height="100%"
                            style={{
                                minHeight: "200px",
                                border: 0,
                                borderRadius: "8px"
                            }}
                            allowFullScreen
                            loading="lazy"
                            title="호텔 위치"
                        ></iframe>
                    </div>
                </div>

                {/* 호텔 이름 + 평점 */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <h2 className="mb-0">{hotel.hotelName}</h2>
                    <span className="text-warning fs-5 ms-3">
                        {"★".repeat(Math.floor(hotel.rating))}
                        {"☆".repeat(5 - Math.floor(hotel.rating))}
                        <span className="text-dark ms-2">({hotel.rating.toFixed(1)})</span>
                    </span>
                </div>

                <div className="room-list my-4">
                    {hotel.rooms
                        .filter((room) => room.maxOccupancy >= totalGuests)
                        .map((room) => {
                            const totalPrice = room.price * nights;
                            return (
                                <div className="card room-card mb-4 p-4" key={room.id}>
                                    <div className="d-flex flex-row align-items-start justify-content-between">
                                        {/* 좌측: 객실 이미지 */}
                                        <div className="room-image me-3">
                                            <img
                                                src={"/puhaha.png"}
                                                className="img-fluid rounded"
                                                alt={room.roomType}
                                                style={{ width: "280px", height: "200px", objectFit: "cover" }}
                                            />
                                        </div>

                                        {/* 중앙: 객실명 + 정보 + 시설 */}
                                        <div className="room-info flex-grow-1">
                                            <h5 className="card-title">{room.roomType}</h5>
                                            <p className="card-text mb-1">최대 인원: {room.maxOccupancy}명</p>
                                            <p className="card-text mb-1">1박 요금: {room.price.toLocaleString()}원</p>
                                            {nights > 0 && (
                                                <p className="card-text mb-1">
                                                    총 {nights}박: <strong>{(room.price * nights).toLocaleString()}원</strong>
                                                </p>
                                            )}

                                            {/* 편의시설 */}
                                            <div className="facility-list mt-2">
                                                {[
                                                    { key: 'airConditioner', label: '에어컨' },
                                                    { key: 'bathtub', label: '욕조' },
                                                    { key: 'coffeeMaker', label: '커피 메이커' },
                                                    { key: 'desk24hour', label: '24시간 데스크' },
                                                    { key: 'doubleBed', label: '더블침대' },
                                                    { key: 'gym', label: '헬스장' },
                                                    { key: 'heater', label: '히터' },
                                                    { key: 'internet', label: '인터넷' },
                                                    { key: 'ironingService', label: '다림질 서비스' },
                                                    { key: 'kitchen', label: '주방' },
                                                    { key: 'nonSmokingRoom', label: '금연실' },
                                                    { key: 'parking', label: '주차장' },
                                                    { key: 'petFriendly', label: '반려동물 가능' },
                                                    { key: 'privatePool', label: '프라이빗 풀' },
                                                    { key: 'queenBed', label: '퀸침대' },
                                                    { key: 'refrigerator', label: '냉장고' },
                                                    { key: 'restaurant', label: '레스토랑' },
                                                    { key: 'singleBed', label: '싱글침대' },
                                                    { key: 'smokingArea', label: '흡연 구역' },
                                                    { key: 'spaSauna', label: '스파/사우나' },
                                                    { key: 'terrace', label: '테라스' },
                                                    { key: 'tv', label: 'TV' },
                                                    { key: 'washingMachine', label: '세탁기' },
                                                ].map(({ key, label }) => (
                                                    <span
                                                        key={key}
                                                        className={`facility-item ${room[key] === '없음' ? 'absent' : ''}`}
                                                    >{label}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 우측: 예약 버튼 */}
                                        <div className="d-flex align-items-center justify-content-end">
                                            <button
                                                className="btn btn-primary btn-lg px-4 py-2 fw-bold"
                                                style={{ minWidth: "120px" }}
                                                onClick={() =>
                                                    navigate("/payment", {
                                                        state: { hotel, room, checkInDate, checkOutDate, guests },
                                                    })
                                                }
                                            >
                                                예약하기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>

            </div>
        </>
    );
}
