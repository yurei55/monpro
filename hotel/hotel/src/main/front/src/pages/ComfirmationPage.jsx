// src/pages/ConfirmationPage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ConfirmationPage() {
  return (
    <div className="container my-5 text-center">
      <h3>결제가 완료되었습니다!</h3>
      <p>“예약조회” 메뉴에서 내역을 확인할 수 있습니다.</p>
      <Link to="/orders" className="btn btn-primary">
        예약조회로 이동
      </Link>
    </div>
  );
}
