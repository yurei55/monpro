// src/layouts/PopupLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

export default function PopupLayout() {
  // 헤더 없이 오직 자식 컴포넌트만 렌더링
  return <Outlet />;
}
