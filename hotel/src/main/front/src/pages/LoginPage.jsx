// src/pages/LoginPage.jsx
import React from "react";
import Login from "../components/Login";  // Login.jsx 폼 컴포넌트

export default function LoginPage() {
  return (
    // App.js에서 Header 아래에 바로 렌더링되니, container 마진만 잡아도 충분합니다.
    <div className="container my-5">
      <Login />
    </div>
  );
}