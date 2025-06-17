import React, { useEffect, useState } from "react";
import { useLocation , useSearchParams } from "react-router-dom";
import axios from "axios";
import SearchSection from "../components/SearchSection";
import HotelList from "../components/HotelList";

export default function SearchResultPage() {
    const location = useLocation();
    const [hotels, setHotels] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minRating, setMinRating] = useState("");
    const [params] = useSearchParams();
    const checkIn = params.get("checkIn");
    const checkOut = params.get("checkOut");


    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get(`/hotels/search${location.search}`);
                let data = response.data;

                // ✅ 요금 필터
                if (minPrice) {
                    const min = parseInt(minPrice);
                    data = data.filter(h => h.minPrice !== undefined && h.minPrice >= min);
                }
                if (maxPrice) {
                    const max = parseInt(maxPrice);
                    data = data.filter(h => h.minPrice !== undefined && h.minPrice <= max);
                }

                // ✅ 평점 필터
                if (minRating) {
                    const min = parseFloat(minRating);
                    data = data.filter(h => h.rating !== undefined && h.rating >= min);
                }

                // ✅ 정렬
                if (sortBy === "lowPrice") {
                    data.sort((a, b) => a.minPrice - b.minPrice);
                } else if (sortBy === "highPrice") {
                    data.sort((a, b) => b.minPrice - a.minPrice);
                } else if (sortBy === "rating") {
                    data.sort((a, b) => b.rating - a.rating);
                }

                setHotels(data);
            } catch (err) {
                console.error("검색 실패:", err);
            }
        };

        fetchHotels();
    }, [location.search, sortBy, minPrice, maxPrice, minRating]);

    return (
        <main className="container my-4">
            <SearchSection
                defaultCheckIn={checkIn}
                defaultCheckOut={checkOut}
                guests={{
                    rooms: Number(params.get("roomCount") || 1),
                    adults: Number(params.get("adultCount") || 1),
                    children: Number(params.get("childCount") || 0),
                }}
            />

            <div className="row mt-4">
                {/* 🔍 왼쪽 필터/정렬 */}
                <div className="col-md-3 mb-4">
                    <div className="card p-3 shadow-sm">
                        <h5 className="mb-3">정렬 기준</h5>
                        <select className="form-select mb-3" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                            <option value="">선택 없음</option>
                            <option value="lowPrice">낮은 요금순</option>
                            <option value="highPrice">높은 요금순</option>
                            <option value="rating">평점순</option>
                        </select>

                        <h5 className="mt-3 mb-2">요금 구간</h5>
                        <input
                            type="number"
                            className="form-control mb-2"
                            placeholder="최소 요금"
                            value={minPrice}
                            onChange={e => setMinPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            className="form-control mb-3"
                            placeholder="최대 요금"
                            value={maxPrice}
                            onChange={e => setMaxPrice(e.target.value)}
                        />

                        <h5 className="mb-2">최저 평점</h5>
                        <input
                            type="number"
                            step="0.1"
                            max="5"
                            min="0"
                            className="form-control"
                            placeholder="예: 3.5"
                            value={minRating}
                            onChange={e => setMinRating(e.target.value)}
                        />
                    </div>
                </div>

                {/* 🏨 오른쪽 호텔 리스트 */}
                <div className="col-md-9">
                    <HotelList
                        hotels={hotels}
                        showPrice={true}
                        checkInDate={checkIn}
                        checkOutDate={checkOut}
                        guests={{
                            rooms: Number(params.get("roomCount") || 1),
                            adults: Number(params.get("adultCount") || 1),
                            children: Number(params.get("childCount") || 0),
                        }}
                    />
                </div>
            </div>
        </main>
    );
}
