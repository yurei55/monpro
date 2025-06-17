import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem("currentUser");
        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setUser(null);
        navigate("/login");
    };

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
                    <img
                        src="/hotellia-logo.png"
                        alt="호텔 로고"
                        style={{ height: "120px", marginRight: "10px" }}
                    />
                    <Link
                        to="/"
                        style={{
                            fontFamily: "'Playfair Display', serif",  // ✅ 핵심 스타일
                            fontSize: "28px",
                            fontWeight: 600,
                            color: "#3E2F1C",
                            letterSpacing: "1px",
                            textDecoration: "none",
                        }}
                    >
                        HOTELLIA
                    </Link>
                </div>

                {/* 오른쪽: 메뉴 */}
                <div style={{ fontSize: "16px", whiteSpace: "nowrap" }}>
                    {user ? (
                        <>
                            <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
                                {user.name || user.uid}
                            </Link>
                            {" | "}
                            <span
                                onClick={handleLogout}
                                style={{ cursor: "pointer", textDecoration: "none", color: "black" }}
                            >
                로그아웃
              </span>
                            {" | "}
                            <Link to="/orders" style={{ textDecoration: "none", color: "black" }}>
                                예약조회
                            </Link>
                            {" | "}
                            <Link to="/customer-care" style={{ textDecoration: "none", color: "black" }}>
                                고객센터
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
                                로그인
                            </Link>
                            {" | "}
                            <Link to="/join" style={{ textDecoration: "none", color: "black" }}>
                                회원가입
                            </Link>
                            {" | "}
                            <Link to="/orders" style={{ textDecoration: "none", color: "black" }}>
                                예약조회
                            </Link>
                            {" | "}
                            <Link to="/customer-care" style={{ textDecoration: "none", color: "black" }}>
                                고객센터
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
