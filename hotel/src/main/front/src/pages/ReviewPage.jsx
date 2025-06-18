import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function ReviewPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { hotel, reservationDate, room } = location.state || {};

    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleRatingClick = (star) => setRating(star);

    const handleSubmit = async () => {
        if (!title || !content || rating === 0) {
            alert("별점, 제목, 내용을 모두 입력해주세요.");
            return;
        }

        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }
        //  디버깅용 콘솔 로그
        console.log("📦 hotel:", hotel);
        console.log("📦 room:", room); // 여기서 room이 undefined면 문제
        console.log("👤 currentUser:", currentUser);

        const reviewData = {
            hotelName: hotel.hotelName,
            roomId: room?.id,
            memberName: currentUser.name,
            memberEmail: currentUser.email,
            rating,
            title: `${title}`,
            content: `${content}`,
        };

        try {
            await axios.post("/api/reviews", reviewData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            alert("리뷰가 등록되었습니다!");
            navigate(`/hotels/${hotel.id}`);
        } catch (error) {
            console.error("리뷰 등록 실패:", error);
            alert("리뷰 등록에 실패했습니다.");
        }

        console.log("보내는 데이터:", reviewData);
    };
    return (
        <div className="container my-5">
            <div
                className="bg-light p-4 rounded"
                style={{
                    backgroundImage: `url(https://teama-leemw-s3.s3.ap-northeast-3.amazonaws.com/hotel/img/${hotel.id}.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                    height: "500px",
                }}
            >
                <h3>{hotel.hotelName}</h3>
                <p>예약일자: {reservationDate}</p>

                {/* 별점 */}
                <div className="mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            style={{ fontSize: "1.5rem", cursor: "pointer", color: star <= rating ? "gold" : "#ddd" }}
                            onClick={() => handleRatingClick(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>

            {/* 제목 입력 */}
            <input
                type="text"
                className="form-control my-3"
                placeholder="리뷰 제목을 입력해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* 내용 입력 */}
            <textarea
                className="form-control"
                rows={6}
                placeholder="상세한 리뷰를 작성해주세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            {/* 버튼 */}
            <div className="text-end mt-3">
                <button className="btn btn-primary" onClick={handleSubmit}>
                    리뷰 작성 완료
                </button>
            </div>
        </div>
    );
}