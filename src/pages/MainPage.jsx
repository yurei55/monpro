//// src/pages/MainPage.jsx
// import React from "react";
// import SearchSection from "../components/SearchSection";
// import Carousel from "../components/Carousel";
// import HotelList from "../components/HotelList";

// export default function MainPage() {
//   return (
//     <main className="container my-4">
//       {/* 검색 섹션 */}
//       <SearchSection />

//       {/* 캐러셀 */}
//       <div className="my-4">
//         <Carousel />
//       </div>

//       {/* 호텔 리스트 */}
//       <HotelList />
//     </main>
//   );
// }


// 

// src/pages/MainPage.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import Papa from "papaparse";
import SearchSection from "../components/SearchSection";
import HotelList     from "../components/HotelList";
import Carousel from "../components/Carousel";

export default function MainPage() {
  const [allHotels, setAllHotels]         = useState([]);
  const [displayedHotels, setDisplayed]   = useState([]);
  const [visibleCount, setVisibleCount]   = useState(16);
  const loaderRef = useRef(null);

  // CSV 파싱 (한 번만)
  useEffect(() => {
    Papa.parse("/hotel_20230405.csv", {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        const parsed = data.map((row) => ({
          id:       row.id,
          name:     row.name,
          price:    Number(row.price),
          imageUrl: row.imageUrl,
        }));
        setAllHotels(parsed);
        setDisplayed(parsed);
      },
      error: (err) => console.error("CSV 파싱 오류:", err),
    });
  }, []);

  // 검색 핸들러: 필터링 후 visibleCount 리셋
  const handleSearch = useCallback((query) => {
    const q = query.trim().toLowerCase();
    const filtered =
      q === ""
        ? allHotels
        : allHotels.filter((h) => h.name.toLowerCase().includes(q));
    setDisplayed(filtered);
    setVisibleCount(16);
  }, [allHotels]);

  // IntersectionObserver 콜백: loader가 보이면 load more
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleCount < displayedHotels.length
        ) {
          setVisibleCount((vc) =>
            Math.min(vc + 16, displayedHotels.length)
          );
        }
      },
      { rootMargin: "200px" } // 조금 미리 로드
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => observer.disconnect();
  }, [visibleCount, displayedHotels.length]);

  return (
    <main className="container my-4">
      {/* 검색창 */}
      <SearchSection onSearch={handleSearch} />

      {/*Carousel*/}
      <div className="my-4"><Carousel /></div>

      {/* 잘라낸 만큼만 넘겨줌 */}
      <HotelList hotels={displayedHotels.slice(0, visibleCount)} />

      {/* 더 로드할 게 있으면 이 div가 화면에 나타나면서 추가 로드 */}
      {visibleCount < displayedHotels.length && (
        <div
          ref={loaderRef}
          style={{ height: "1px", margin: "10px 0" }}
        />
      )}
    </main>
  );
}

