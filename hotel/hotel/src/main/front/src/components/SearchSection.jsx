// SearchSection.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchSection({onSearch, defaultCheckIn, defaultCheckOut, guests: defaultGuests, setGuests, setCheckInDate, setCheckOutDate,}) {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [query, setQuery] = useState("");
  const [checkIn, setCheckIn] = useState(defaultCheckIn || today);
  const [checkOut, setCheckOut] = useState(defaultCheckOut || today);
  const [rooms, setRooms] = useState(defaultGuests?.rooms || 1);
  const [adults, setAdults] = useState(defaultGuests?.adults || 1);
  const [children, setChildren] = useState(defaultGuests?.children || 0);

  // 외부 상태 동기화
  useEffect(() => {
    setCheckInDate?.(checkIn);
    setCheckOutDate?.(checkOut);
    setGuests?.({ rooms, adults, children });
  }, [checkIn, checkOut, rooms, adults, children]);

  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);
    if (newCheckIn > checkOut) {
      setCheckOut(newCheckIn);
    }
  };

  const handleCheckOutChange = (e) => {
    const newCheckOut = e.target.value;
    if (newCheckOut >= checkIn) {
      setCheckOut(newCheckOut);
    }
  };

  const updateGuestText = () =>
      `객실 ${rooms}, 성인 ${adults}, 아동 ${children}`;

  const handleSearchClick = () => {
    if (!checkIn || !checkOut) {
      alert("체크인과 체크아웃 날짜를 선택하세요.");
      return;
    }

    const params = new URLSearchParams({
      region: query.trim(),
      checkIn,
      checkOut,
      roomCount: rooms,
      adultCount: adults,
      childCount: children,
    });

    if (onSearch) {
      onSearch(Object.fromEntries(params));
    } else {
      navigate(`/search?${params.toString()}`, {
        state: {
          checkInDate: checkIn,
          checkOutDate: checkOut,
          guests: {
            rooms,
            adults,
            children,
          },
        },
      });
    }
  };

  return (
      <section className="container my-4">
        <div className="row g-2">
          <div className="col-md">
            <input
                type="text"
                className="form-control"
                placeholder="🔍 어느 지역 호텔을 예약할까요?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="col-md">
            <input
                type="date"
                className="form-control"
                value={checkIn}
                min={today}
                onChange={handleCheckInChange}
            />
          </div>
          <div className="col-md">
            <input
                type="date"
                className="form-control"
                value={checkOut}
                min={checkIn}
                onChange={handleCheckOutChange}
            />
          </div>
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
          <div className="col-md">
            <button className="btn btn-primary w-100" onClick={handleSearchClick}>
              검색
            </button>
          </div>
        </div>
      </section>
  );
}
