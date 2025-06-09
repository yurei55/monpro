import React from "react";
import { Link } from "react-router-dom";

export default function HotelCard({ id, name, price, imageUrl, soldOut, rating, showPrice }) {
    // S3 이미지 경로 구성
    const s3ImageUrl = `https://teama-leemw-s3.s3.ap-northeast-3.amazonaws.com/hotel/img/${id}.jpg`;

    return (
        <div className="card h-100 position-relative">
            <Link to={`/hotels/${Number(id)}`}>
                <img
                    src={s3ImageUrl}
                    onError={(e) => {
                        if (!e.target.src.includes("default.jpg")) {
                            e.target.src = "/default.jpg";
                        }
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
                <h5 className="card-title">
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
