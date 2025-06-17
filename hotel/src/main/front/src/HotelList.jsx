import React from "react";
import HotelCard from "./HotelCard";

const HotelList = () => {
  return (
    <div className="container">
      
      <div className="row mt-5 mb-1">
        <div className="col text-center">
          <h2>최근 가장 많이 찾는 호텔목록</h2>
        </div>
      </div>

      <div className="row">
        <HotelCard
          id="109469"
          name="글래드 마포"
          price={175000}
          imageUrl="hotelimg/글래드 마포1.jpg"
        />
        {/* 여기서 HotelCard 여러개 복붙하거나, map 돌리면 됩니다 */}
      </div>

    </div>
  );
};

export default HotelList;