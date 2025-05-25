import { useState } from "react";

export default function SearchSection({ onSearch }) {
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const [query, setQuery] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(today);

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

  // return (
  //   <section className="container my-4">
  //     <div className="row g-2">
  //       <div className="col-md">
  //         <input
  //           type="text"
  //           className="form-control"
  //           placeholder="🔍 어느 지역 호텔을 예약할까요?"
  //         />
  //       </div>
  return (
    <section className="container my-4">
      <div className="row g-2">
        <div className="col-md">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 어느 지역 호텔을 예약할까요?"
            value={query}                              // ★ value/ onChange 바인딩
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-md">
          <input type="date" className="form-control" id="checkin" value={checkInDate} min={today} onChange={handleCheckInChange} />
        </div>
        <div className="col-md">
          <input type="date" className="form-control" id="checkout" value={checkOutDate} min={checkInDate} onChange={handleCheckOutChange} />
        </div>
        <div className="col-md dropdown">
          <button
            className="btn btn-outline-secondary dropdown-toggle w-100"
            type="button"
            data-bs-toggle="dropdown"
          >
            {updateGuestText()}
          </button>
          <ul className="dropdown-menu w-100">
            <li>
              <label className="dropdown-item">
                객실
                <input
                  id="rooms"
                  type="number"
                  min="1"
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  className="form-control mt-1"
                />
              </label>
            </li>
            <li>
              <label className="dropdown-item">
                성인
                <input
                  id="adults"
                  type="number"
                  min="1"
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="form-control mt-1"
                />
              </label>
            </li>
            <li>
              <label className="dropdown-item">
                아동
                <input
                  id="children"
                  type="number"
                  min="0"
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="form-control mt-1"
                />
              </label>
            </li>
          </ul>
        </div>
        <div className="col-md">
          <button
            className="btn btn-primary w-100"
            onClick={() => onSearch && onSearch(query)}  // ★ 검색 콜백 호출
          >
            검색
          </button>
        </div>
        {/* <div className="col-md">
          <button className="btn btn-primary w-100">검색</button>
        </div> */}
      </div>
    </section>
  );
}