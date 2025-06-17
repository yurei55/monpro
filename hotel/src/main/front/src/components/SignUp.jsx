import React, { useState, useEffect } from "react";
import axios from "axios";

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

    const [yearOptions, setYearOptions] = useState([]);
    const [dayOptions, setDayOptions] = useState([]);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const adultYear = currentYear - 19;
        const years = [];
        for (let y = adultYear; y >= adultYear - 101; y--) {
            years.push(y);
        }
        setYearOptions(years);
    }, []);

    useEffect(() => {
        const year = parseInt(form.birthYear, 10);
        const month = parseInt(form.birthMonth, 10);
        if (year && month) {
            const lastDay = new Date(year, month, 0).getDate();
            setDayOptions(Array.from({ length: lastDay }, (_, i) => i + 1));
            if (form.birthDay > lastDay) {
                setForm((prev) => ({ ...prev, birthDay: "" }));
            }
        } else {
            setDayOptions([]);
            setForm((prev) => ({ ...prev, birthDay: "" }));
        }
    }, [form.birthYear, form.birthMonth]);// eslint-disable-next-line

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckId = async () => {
        if (!form.uid) {
            alert("ID를 입력하세요.");
            return;
        }

        try {
            const response = await fetch(`/api/members/check-id?uid=${encodeURIComponent(form.uid)}`);
            const result = await response.text();

            if (result === "DUPLICATE") {
                alert("이미 사용 중인 이메일입니다.");
            } else if (result === "AVAILABLE") {
                alert("사용 가능한 이메일입니다.");
                setForm(prev => ({ ...prev, check_id: form.uid }));
            } else {
                alert("서버로부터 알 수 없는 응답을 받았습니다.");
            }
        } catch (error) {
            console.error(error);
            alert("서버 요청 실패: " + error.message);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.check_id) {
            alert("중복ID 조사를 먼저 하십시요.");
            return;
        }
        if (!form.uid || !form.pwd || !form.pwd1 || form.pwd !== form.pwd1 || !form.name ||
            !form.tel1 || !form.tel2 || !form.tel3 || !form.juso ||
            !form.birthYear || !form.birthMonth || !form.birthDay) {
            alert("입력값이 유효하지 않습니다.");
            return;
        }

        const requestData = {
            email: form.uid,
            password: form.pwd,
            name: form.name,
            phoneNumber: `${form.tel1}-${form.tel2}-${form.tel3}`,
            address: `${form.juso} ${form.jusoDetail}`,
            birthDate: `${form.birthYear}-${form.birthMonth.padStart(2, '0')}-${form.birthDay.padStart(2, '0')}`
        };

        try {
            await axios.post("http://localhost:8080/api/members/signup", requestData);
            alert("회원가입 성공!");
            window.location.href = "/login"; // 로그인 페이지로 이동
        } catch (err) {
            console.error(err);
            alert("회원가입 실패");
        }
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
