// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    uid:      "",
    name:     "",
    tel1:     "",
    tel2:     "",
    tel3:     "",
    juso:     "",
    jusoDetail:"",
  });

  // 로그인 체크 및 초기 폼 채우기
  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (!stored) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    const user = JSON.parse(stored);
    setForm({
      uid:        user.uid      || "",
      name:       user.name     || "",
      tel1:       user.tel1     || "",
      tel2:       user.tel2     || "",
      tel3:       user.tel3     || "",
      juso:       user.juso     || "",
      jusoDetail: user.jusoDetail|| "",
    });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 간단 유효성
    if (!form.name) { alert("이름을 입력하세요."); return; }
    if (!form.tel1 || !form.tel2 || !form.tel3) { alert("휴대폰을 모두 입력하세요."); return; }
    if (!form.juso) { alert("주소를 입력하세요."); return; }

    // 저장
    const updated = { ...form };
    localStorage.setItem("currentUser", JSON.stringify(updated));
    alert("회원정보가 수정되었습니다.");
  };

  return (
    <div className="container my-4">
      <h3 className="mb-4">회원정보 수정</h3>
      <form onSubmit={handleSubmit}>
        {/* 이메일(uid) */}
        <div className="mb-3">
          <label>이메일(아이디)</label>
          <input type="email" className="form-control" value={form.uid} disabled />
        </div>

        {/* 이름 */}
        <div className="mb-3">
          <label>이름</label>
          <input
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* 휴대폰 */}
        <div className="mb-3 d-flex">
          <input
            name="tel1"
            className="form-control me-1"
            style={{ width: "80px" }}
            value={form.tel1}
            onChange={handleChange}
            required
          />
          <input
            name="tel2"
            className="form-control me-1"
            style={{ width: "100px" }}
            value={form.tel2}
            onChange={handleChange}
            required
          />
          <input
            name="tel3"
            className="form-control"
            style={{ width: "100px" }}
            value={form.tel3}
            onChange={handleChange}
            required
          />
        </div>

        {/* 주소 */}
        <div className="mb-3">
          <label>주소</label>
          <input
            name="juso"
            className="form-control mb-2"
            value={form.juso}
            onChange={handleChange}
            required
          />
          <input
            name="jusoDetail"
            className="form-control"
            value={form.jusoDetail}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          정보 수정
        </button>
      </form>
    </div>
  );
}
