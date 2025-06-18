import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Header() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    // 마운트 시 localStorage에서 로그인 유저 정보 가져오기
    // ✅ 서버 세션 상태 확인
    useEffect(() => {
        axios.get("/api/members/me")
            .then(res => {
                setUser(res.data);
                localStorage.setItem("currentUser", JSON.stringify(res.data)); // 동기화
            })
            .catch(() => {
                setUser(null);
                localStorage.removeItem("currentUser"); // ⛔ 세션 없으면 stale 데이터 제거
            });
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post("/api/logout", {}, { withCredentials: true }); // 서버 세션 무효화
        } catch (e) {
            console.warn("서버 로그아웃 실패 (무시 가능)", e);
        }
        localStorage.removeItem("currentUser");
        setUser(null);
        navigate("/login");
    };
    //팝업창 헤더 제거
    if (typeof window !== "undefined" && window.opener) {
        return null;
    }

    return (
        <div className="container py-2">
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {/* 왼쪽: 로고 + 브랜드명 */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Link
                        to="/"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "28px",
                            fontWeight: 600,
                            color: "#3E2F1C",
                            letterSpacing: "1px",
                            textDecoration: "none",
                        }}
                    >
                        <img
                            src="/hotellia-logo.png"
                            alt="호텔 로고"
                            style={{ height: "120px", marginRight: "10px" }}
                        />
                        HOTELLIA
                    </Link>
                </div>

                <div
                    className="col mt-3"
                    style={{ textAlign: "right", fontSize: "16px" }}
                >
                    {user ? (
                        <>
                            {/* 로그인 상태: 아이디/이름 메뉴 + 로그아웃 */}
                            <Link
                                to="/profile"
                                style={{ textDecoration: "none", color: "black" }}
                            >
                                {user.name || user.uid}
                            </Link>
                            {" | "}
                            <span
                                onClick={handleLogout}
                                style={{
                                    cursor: "pointer",
                                    textDecoration: "none",
                                    color: "black",
                                }}
                            >
                로그아웃
              </span>

                            {" | "}
                            <Link
                                to="/orders"
                                style={{ textDecoration: "none", color: "black" }}
                            >
                                예약조회
                            </Link>
                            {" | "}
                            <Link
                                to="/customer-care"
                                style={{ textDecoration: "none", color: "black" }}
                            >
                                고객센터
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* 비로그인 상태: 로그인/회원가입 */}
                            <Link
                                to="/login"
                                style={{ textDecoration: "none", color: "black" }}
                            >
                                로그인
                            </Link>
                            {" | "}
                            <Link
                                to="/join"
                                style={{ textDecoration: "none", color: "black" }}
                            >
                                회원가입
                            </Link>
                            {" | "}
                            <Link
                                to="/orders"
                                style={{ textDecoration: "none", color: "black" }}
                            >
                                예약조회
                            </Link>
                            {" | "}
                            <Link
                                to="/customer-care"
                                style={{ textDecoration: "none", color: "black" }}
                            >
                                고객센터
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
