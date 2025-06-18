import React from "react";
import { Link } from "react-router-dom";
import fallback1 from "../assets/fallbacks/fallback1.jpg";
import fallback2 from "../assets/fallbacks/fallback2.jpg";
import fallback3 from "../assets/fallbacks/fallback3.jpg";
import fallback4 from "../assets/fallbacks/fallback4.jpg";
import fallback5 from "../assets/fallbacks/fallback5.jpg";
import fallback6 from "../assets/fallbacks/fallback6.jpg";
import fallback7 from "../assets/fallbacks/fallback7.jpg";
import fallback8 from "../assets/fallbacks/fallback8.jpg";
import fallback9 from "../assets/fallbacks/fallback9.jpg";
import fallback10 from "../assets/fallbacks/fallback10.jpg";
import fallback11 from "../assets/fallbacks/fallback11.jpg";
import fallback12 from "../assets/fallbacks/fallback12.jpg";


export default function HotelCard({ id, name, price, imageUrl, soldOut, rating, showPrice, guests, checkInDate, checkOutDate }) {
    // S3 이미지 경로 구성
    const s3ImageUrl = `https://teama-leemw-s3.s3.ap-northeast-3.amazonaws.com/hotel/img/${id}.jpg`;
    const fallbackImages = [
        fallback1, fallback2, fallback3, fallback4,
        fallback5, fallback6, fallback7, fallback8,
        fallback9, fallback10, fallback11, fallback12
    ];

    const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

    return (
        <div className="card h-100 position-relative">
            <Link
                to={`/hotels/${Number(id)}`}
                state={{
                    hotel: {
                        id,
                        hotelName: name,
                        price, // 혹은 minPrice
                        rating,
                        imageUrl
                    },
                    guests,
                    checkInDate,
                    checkOutDate
                }}
            >


            <img
                    src={s3ImageUrl}
                    onError={(e) => {
                        e.target.onerror = null; // 무한루프 방지
                        e.target.src = randomFallback;
                    }}
                    className="card-img-top"
                    alt={name}
                    style={{
                        height: "240px",
                        objectFit: "cover",
                        width: "100%",
                        backgroundColor: "#f8f8f8",
                    }}
                />
            </Link>

            {soldOut && (
                <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                    매진
                </span>
            )}

            <div className="card-body bg-light text-center" style={{ fontSize: "15px" }}>
                <h5 className="card-title" style={{height: "3em" }}>
                    <Link to={`/hotels/${id}`} className="text-decoration-none text-dark">
                        {name}
                    </Link>
                </h5>

                <div className="d-flex justify-content-between px-1 mt-3">
                    <span className="text-warning fw-bold">
                        ⭐ {rating?.toFixed(1) ?? "0.0"}
                    </span>

                    {showPrice && (
                        <span className="fw-bold text-primary">
                            ₩{(price ?? 0).toLocaleString()}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
