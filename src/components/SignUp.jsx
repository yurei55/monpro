import React, { useState, useEffect } from "react";

export default function SignUp() {
    const [form, setForm] = useState({
        uid: "",
        check_id: "",
        pwd: "",
        pwd1: "",
        name: "",
        tel1: "010",
        tel2: "",
        tel3: "",
        juso: "",
        jusoDetail: "",
        birthYear: "",
        birthMonth: "",
        birthDay: "",
    });

    // 년/월/일 옵션 생성용 상태
    const [yearOptions, setYearOptions] = useState([]);
    const [dayOptions, setDayOptions] = useState([]);

    // 오늘 기준 성인 연도 계산
    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const adultYear = currentYear - 19;
        const years = [];
        // 성인(만 19세) 기준 연도부터 101년 전까지
        for (let y = adultYear; y >= adultYear - 101; y--) {
            years.push(y);
        }
        setYearOptions(years);
    }, []);

    // ② birthYear 또는 birthMonth가 바뀔 때마다 정확한 일 수 계산
    useEffect(() => {
        const year = parseInt(form.birthYear, 10);
        const month = parseInt(form.birthMonth, 10);
        if (year && month) {
            // new Date(year, month, 0) → 해당 월의 마지막 날
            const lastDay = new Date(year, month, 0).getDate();
            setDayOptions(Array.from({ length: lastDay }, (_, i) => i + 1));
            // 선택된 day가 범위를 넘으면 초기화
            if (form.birthDay > lastDay) {
                setForm((prev) => ({ ...prev, birthDay: "" }));
            }
        } else {
            setDayOptions([]);
            setForm((prev) => ({ ...prev, birthDay: "" }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.birthYear, form.birthMonth]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckId = () => {
        if (!form.uid) {
            alert("ID를 입력하십시요.");
            return;
        }
        window.open(
            `/member_idcheck.html?uid=${form.uid}`,
            "idCheck",
            "width=300,height=200,scrollbars=no"
        );
        setForm((prev) => ({ ...prev, check_id: form.uid }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.check_id) {
            alert("중복ID 조사를 먼저 하십시요.");
            return;
        }
        if (!form.uid) {
            alert("아이디가 잘못되었습니다.");
            return;
        }
        if (!form.pwd) {
            alert("암호가 잘못되었습니다.");
            return;
        }
        if (!form.pwd1) {
            alert("암호 확인이 잘못되었습니다.");
            return;
        }
        if (form.pwd !== form.pwd1) {
            alert("암호가 일치하지 않습니다.");
            return;
        }
        if (!form.name) {
            alert("이름이 잘못되었습니다.");
            return;
        }
        if (!form.tel1 || !form.tel2 || !form.tel3) {
            alert("핸드폰이 잘못되었습니다.");
            return;
        }
        if (!form.juso) {
            alert("주소가 잘못되었습니다.");
            return;
        }
        // 생년월일 유효성 체크
        if (!form.birthYear || !form.birthMonth || !form.birthDay) {
            alert("생년월일을 모두 선택하세요.");
            return;
        }

        alert("회원가입 폼이 유효합니다! 이곳에서 API 요청을 보내세요.");
    };

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-6">
                <h2 className="text-center mt-5 mb-3">회원 가입</h2>
                <form onSubmit={handleSubmit}>
                    <table style={{ fontSize: "12px" }} className="w-100">
                        <tbody>
                            <tr height="40">
                                <td>이메일(아이디)<font color="red">*</font></td>
                                <td>
                                    <div className="d-inline-flex">
                                        <input
                                            type="email"
                                            name="uid"
                                            value={form.uid}
                                            onChange={handleChange}
                                            className="form-control form-control-sm"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleCheckId}
                                        className="btn btn-sm btn-secondary text-white mb-1 ms-2"
                                        style={{ fontSize: "12px" }}
                                    >
                                        중복 아이디
                                    </button>
                                </td>
                            </tr>

                            <tr height="40">
                                <td>비밀번호 <font color="red">*</font></td>
                                <td>
                                    <input
                                        type="password"
                                        name="pwd"
                                        value={form.pwd}
                                        onChange={handleChange}
                                        pattern="^([a-z0-9_]){6,50}$"
                                        placeholder="6글자 이상의 영문자,숫자,밑줄만 이용"
                                        className="form-control form-control-sm"
                                    />
                                </td>
                            </tr>
                            <tr height="40">
                                <td>비밀번호 확인 <font color="red">*</font></td>
                                <td>
                                    <input
                                        type="password"
                                        name="pwd1"
                                        value={form.pwd1}
                                        onChange={handleChange}
                                        pattern="^([a-z0-9_]){6,50}$"
                                        placeholder="6글자 이상의 영문자,숫자,밑줄만 이용"
                                        className="form-control form-control-sm"
                                    />
                                </td>
                            </tr>

                            <tr height="40">
                                <td>이름 <font color="red">*</font></td>
                                <td>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="form-control form-control-sm"
                                    />
                                </td>
                            </tr>

                            <tr height="40" style={{ verticalAlign: "top" }}>
                                <td style={{ verticalAlign: "top" }}>
                                    생년월일 <font color="red">*</font>
                                </td>
                                <td style={{ verticalAlign: "top" }}>
                                    <div className="d-inline-flex align-items-start">
                                        {/* 연도 */}
                                        <select
                                            name="birthYear"
                                            value={form.birthYear}
                                            onChange={handleChange}
                                            className="form-select form-select-sm w-auto me-2"
                                            required
                                        >
                                            <option value="">년</option>
                                            {yearOptions.map((y) => (
                                                <option key={y} value={y}>
                                                    {y}년
                                                </option>
                                            ))}
                                        </select>

                                        {/* 월 */}
                                        <select
                                            name="birthMonth"
                                            value={form.birthMonth}
                                            onChange={handleChange}
                                            className="form-select form-select-sm w-auto me-2"
                                            required
                                        >
                                            <option value="">월</option>
                                            {[...Array(12)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1}월
                                                </option>
                                            ))}
                                        </select>

                                        {/* 일 */}
                                        <select
                                            name="birthDay"
                                            value={form.birthDay}
                                            onChange={handleChange}
                                            className="form-select form-select-sm"
                                            required
                                        >
                                            <option value="">일</option>
                                            {dayOptions.map((d) => (
                                                <option key={d} value={d}>
                                                    {d}일
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </td>
                            </tr>

                            <tr height="40">
                                <td>휴대폰 <font color="red">*</font></td>
                                <td>
                                    <div className="d-inline-flex">
                                        <input
                                            type="text"
                                            name="tel1"
                                            value={form.tel1}
                                            onChange={handleChange}
                                            maxLength="3"
                                            className="form-control form-control-sm"
                                            style={{ width: "60px" }}
                                            pattern="^[0-9]+$"
                                            title="숫자만 입력할 수 있습니다."
                                        />&nbsp;-
                                        <input
                                            type="text"
                                            name="tel2"
                                            value={form.tel2}
                                            onChange={handleChange}
                                            maxLength="4"
                                            className="form-control form-control-sm"
                                            style={{ width: "80px" }}
                                            pattern="^[0-9]+$"
                                            title="숫자만 입력할 수 있습니다."
                                        />&nbsp;-
                                        <input
                                            type="text"
                                            name="tel3"
                                            value={form.tel3}
                                            onChange={handleChange}
                                            maxLength="4"
                                            className="form-control form-control-sm"
                                            style={{ width: "80px" }}
                                            pattern="^[0-9]+$"
                                            title="숫자만 입력할 수 있습니다."
                                        />
                                    </div>
                                </td>
                            </tr>

                            <tr height="40">
                                <td>주소 <font color="red">*</font></td>
                                <td>
                                    <input
                                        type="text"
                                        name="juso"
                                        value={form.juso}
                                        onChange={handleChange}
                                        className="form-control form-control-sm"
                                        placeholder="기본 주소"
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>
                                    <input
                                        type="text"
                                        name="jusoDetail"
                                        value={form.jusoDetail}
                                        onChange={handleChange}
                                        className="form-control form-control-sm"
                                        placeholder="상세 주소"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="text-center my-4">
                        <button type="submit" className="btn btn-sm btn-dark text-white">
                            회원가입
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
