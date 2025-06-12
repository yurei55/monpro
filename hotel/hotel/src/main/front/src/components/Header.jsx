import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    // 마운트 시 localStorage에서 로그인 유저 정보 가져오기
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

    //팝업창 헤더 제거
    if (typeof window !== "undefined" && window.opener) {
        return null;
    }

    return (
        <div className="container">
            {/* 쇼핑몰 로고와 메뉴 */}
            <div className="row">
                <div className="col fs-3" style={{ textAlign: "left" }}>
                    <img src="images/hotel_logo4.png" alt="호텔 로고" />
                    <Link
                        to="/"
                        style={{
                            color: "black",
                            fontWeight: "bold",
                            marginLeft: "8px",
                            textDecoration: "none",
                        }}
                    >
                        HOTEL Reservation System
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
                            {/*<Link*/}
                            {/*    to="/cart"*/}
                            {/*    style={{ textDecoration: "none", color: "black" }}*/}
                            {/*>*/}
                            {/*    장바구니*/}
                            {/*</Link>*/}
                            {/*{" | "}*/}
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
                            {/*{" | "}*/}
                            {/*<Link*/}
                            {/*    to="/cart"*/}
                            {/*    style={{ textDecoration: "none", color: "black" }}*/}
                            {/*>*/}
                            {/*    장바구니*/}
                            {/*</Link>*/}
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