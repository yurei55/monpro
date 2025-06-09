import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchSection({ onSearch }) {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [query, setQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(today);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const regionToSearch = query.trim();

  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    setCheckInDate(newCheckIn);
    if (newCheckIn > checkOutDate) {
      setCheckOutDate(newCheckIn);
    }
  };

  const handleCheckOutChange = (e) => {
    const newCheckOut = e.target.value;
    if (newCheckOut >= checkInDate) {
      setCheckOutDate(newCheckOut);
    }
  };

  const updateGuestText = () => {
    return `객실 ${rooms}, 성인 ${adults}, 아동 ${children}`;
  };

  const handleSearchClick = () => {
    if (!checkInDate || !checkOutDate) {
      alert("체크인과 체크아웃 날짜를 선택하세요.");
      return;
    }

    const params = new URLSearchParams({
      region: regionToSearch,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      roomCount: rooms,
      adultCount: adults,
      childCount: children,
    });

    if (onSearch) {
      // MainPage에서 검색 시
      onSearch(Object.fromEntries(params));
    } else {
      // SearchResultPage에서 검색 시
      navigate(`/search?${params.toString()}`);
    }
  };


  return (
      <section className="container my-4">
        <div className="row g-2">
          {/* 지역 검색 */}
          <div className="col-md">
            <input
                type="text"
                className="form-control"
                placeholder="🔍 어느 지역 호텔을 예약할까요?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* 체크인 날짜 */}
          <div className="col-md">
            <input
                type="date"
                className="form-control"
                value={checkInDate}
                min={today}
                onChange={handleCheckInChange}
            />
          </div>

          {/* 체크아웃 날짜 */}
          <div className="col-md">
            <input
                type="date"
                className="form-control"
                value={checkOutDate}
                min={checkInDate}
                onChange={handleCheckOutChange}
            />
          </div>

          {/* 인원 수 드롭다운 */}
          <div className="col-md dropdown">
            <button
                className="btn btn-outline-secondary dropdown-toggle w-100"
                type="button"
                data-bs-toggle="dropdown"
            >
              {updateGuestText()}
            </button>
            <ul className="dropdown-menu w-100 p-2">
              <li>
                <label className="form-label">객실</label>
                <input
                    type="number"
                    min="1"
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="form-control"
                />
              </li>
              <li>
                <label className="form-label mt-2">성인</label>
                <input
                    type="number"
                    min="1"
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="form-control"
                />
              </li>
              <li>
                <label className="form-label mt-2">아동</label>
                <input
                    type="number"
                    min="0"
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="form-control"
                />
              </li>
            </ul>
          </div>

          {/* 검색 버튼 */}
          <div className="col-md">
            <button className="btn btn-primary w-100" onClick={handleSearchClick}>
              검색
            </button>
          </div>
        </div>
      </section>
  );
}
