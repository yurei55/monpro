import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchSection from "../components/SearchSection";
import HotelList from "../components/HotelList";
import Carousel from "../components/Carousel";
import axios from "axios";

export default function MainPage() {
    const [hotels, setHotels] = useState([]);
    const [visibleCount, setVisibleCount] = useState(16);
    const loaderRef = useRef(null);
    const navigate = useNavigate();

    // ✅ 오늘, 내일 날짜 설정
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

    const handleSearch = (params) => {
        const query = new URLSearchParams(params).toString();
        navigate(`/search?${query}`);
    };

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get("/hotels");
                setHotels(response.data);
                setVisibleCount(16);
            } catch (err) {
                console.error("전체 호텔 목록 로드 실패:", err);
            }
        };

        fetchHotels();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && visibleCount < hotels.length) {
                    setVisibleCount((vc) => Math.min(vc + 16, hotels.length));
                }
            },
            { rootMargin: "200px" }
        );

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [visibleCount, hotels.length]);

    return (
        <main className="container" style={{ marginTop: "0px", paddingTop: "0px" }}>
            {/* ✅ 오늘과 내일을 초기 날짜로 전달 */}
            <SearchSection
                onSearch={handleSearch}
                defaultCheckIn={today}
                defaultCheckOut={tomorrow}
            />

            <div className="my-4">
                <Carousel />
            </div>

            <div className="row mt-5 mb-1">
                <div className="col text-center">
                    <h2>최근 가장 많이 찾는 호텔목록</h2>
                </div>
            </div>

            <HotelList hotels={hotels.slice(0, visibleCount)} showPrice={false} />

            {visibleCount < hotels.length && (
                <div ref={loaderRef} style={{ height: "1px", margin: "10px 0" }} />
            )}
        </main>
    );
}
