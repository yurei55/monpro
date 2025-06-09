// src/components/HotelList.jsx
import React from "react";
import HotelCard from "./HotelCard";

// const hotels = [
//   {
//     id: "109469",
//     name: "글래드 마포",
//     price: 175000,
//     imageUrl: "hotelimg/글래드 마포1.jpg",
//   },
//   {
//     id: "109470",
//     name: "글래드 여의도",
//     price: 150000,
//     imageUrl: "hotelimg/글래드 여의도1.jpg",
//   },
//   {
//     id: "109471",
//     name: "나인트리 바이 파르나스 명동",
//     price: 185000,
//     imageUrl: "hotelimg/나인트리 바이 파르나스 서울 명동 1.jpg",
//   },
//   {
//     id: "109472",
//     name: "나인트리 바이 파르나스 명동",
//     price: 185000,
//     imageUrl: "hotelimg/나인트리 바이 파르나스 서울 명동 1.jpg",
//   },
//   {
//     id: "109473",
//     name: "나인트리 바이 파르나스 명동",
//     price: 185000,
//     imageUrl: "hotelimg/나인트리 바이 파르나스 서울 명동 1.jpg",
//   },
//   {
//     id: "109474",
//     name: "나인트리 바이 파르나스 명동",
//     price: 185000,
//     imageUrl: "hotelimg/나인트리 바이 파르나스 서울 명동 1.jpg",
//   },
//   {
//     id: "109475",
//     name: "나인트리 바이 파르나스 명동",
//     price: 185000,
//     imageUrl: "hotelimg/나인트리 바이 파르나스 서울 명동 1.jpg",
//   },
//   {
//     id: "109476",
//     name: "나인트리 바이 파르나스 명동",
//     price: 185000,
//     imageUrl: "hotelimg/나인트리 바이 파르나스 서울 명동 1.jpg",
//   },
//   {
//     id: "109477",
//     name: "나인트리 바이 파르나스 명동",
//     price: 185000,
//     imageUrl: "hotelimg/나인트리 바이 파르나스 서울 명동 1.jpg",
//   },
//   {
//     id: "109478",
//     name: "나인트리 바이 파르나스 명동",
//     price: 185000,
//     imageUrl: "hotelimg/나인트리 바이 파르나스 서울 명동 1.jpg",
//   },
//   {
//     id: "109479",
//     name: "나인트리 바이 파르나스 명동",
//     price: 185000,
//     imageUrl: "hotelimg/나인트리 바이 파르나스 서울 명동 1.jpg",
//   },
//   {
//     id: "109480",
//     name: "나인트리 바이 파르나스 명동",
//     price: 185000,
//     imageUrl: "hotelimg/나인트리 바이 파르나스 서울 명동 1.jpg",
//   }
//   // …원하는 만큼 추가
// ];

// hotels prop 으로 데이터 받기
export default function HotelList({ hotels, showPrice }) {
    if (!hotels || hotels.length === 0) {
        return (
            <div className="text-center my-5">
                <p className="fw-bold fs-5">조건에 맞는 호텔이 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row">
                {hotels.map((hotel) => (
                    <div className="col-sm-3 mb-3" key={hotel.hotelId}>
                        <HotelCard
                            id={Number(hotel.hotelId)}
                            name={hotel.hotelName}
                            price={hotel.minPrice}
                            imageUrl={hotel.imageUrl}
                            soldOut={hotel.soldOut}
                            rating={hotel.rating}
                            showPrice={showPrice}  // ✅ 여기 포인트
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

