export default function Header() {
    return (
        <div className="container">
            {/* 쇼핑몰 로고와 메뉴 */}
            <div className="row">
                <div className="col fs-3" style={{ textAlign: "left" }}>
                    <img src="images/hotel_logo4.png" alt="호텔 로고" />
                    <a href="index.html" style={{ color: "black", fontWeight: "bold", marginLeft: "8px" }}>
                        HOTEL Reservation System
                    </a>
                </div>
                <div className="col mt-3" style={{ textAlign: "right", fontSize: "16px" }}>
                    <a href="member_login.php">로그인</a>&nbsp;|&nbsp;
                    <a href="member_join.php">회원가입</a>&nbsp;|&nbsp;
                    <a href="../../../../../Downloads/cart.php">장바구니</a>&nbsp;|&nbsp;
                    <a href="jumun_login.php">예약조회</a>&nbsp;|&nbsp;
                    <a href="customer_care.php">고객센터</a>
                </div>
            </div>
        </div>
    );
}