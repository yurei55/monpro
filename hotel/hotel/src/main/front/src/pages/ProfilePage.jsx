import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function ProfilePage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        uid: "",
        name: "",
        tel1: "",
        tel2: "",
        tel3: "",
        juso: "",
        jusoDetail: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("currentUser");
        if (!stored) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }
        axios.get(`/api/members/me`)
            .then((res) => {
                const data = res.data;
                const [tel1, tel2, tel3] = data.phoneNumber?.split("-") ?? ["", "", ""];
                setForm({
                    uid: data.email || "",
                    name: data.name || "",
                    tel1,
                    tel2,
                    tel3,
                    juso: data.address || "",
                    jusoDetail: data.jusoDetail || "",
                    password: ""
                });
            })
            .catch(() => alert("사용자 정보를 불러오는 데 실패했습니다."));
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const isValidPassword = (password) => {
        if (password.length < 6) return false;
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const onlyAllowed = /^[a-zA-Z0-9_]+$/.test(password);
        return hasLetter && hasDigit && onlyAllowed;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name || !form.tel1 || !form.tel2 || !form.tel3 || !form.juso) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        if (form.password && !isValidPassword(form.password)) {
            alert("비밀번호는 6자 이상, 영문자와 숫자를 포함하고 밑줄(_) 외 특수문자는 사용할 수 없습니다.");
            return;
        }

        const updateData = {
            name: form.name,
            phoneNumber: `${form.tel1}-${form.tel2}-${form.tel3}`,
            address: form.juso,
            jusoDetail: form.jusoDetail,
            password: form.password || "",
            confirmPassword: form.password || ""
        };

        axios.put(`/api/members/update/${encodeURIComponent(form.uid)}`, updateData)
            .then(() => axios.get('/api/members/me'))
            .then((res) => {
                localStorage.setItem("currentUser", JSON.stringify(res.data));
                alert("회원정보가 수정되었습니다.");
                navigate("/");
            })
            .catch((err) => {
                console.error(err.response?.data);
                alert("회원정보 수정에 실패했습니다.");
            });
    };

    return (
        <div className="container my-4">
            <h3 className="mb-4">회원정보 수정</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>이메일(아이디)</label>
                    <input type="email" className="form-control" value={form.uid} disabled />
                </div>

                <div className="mb-3">
                    <label>
                        비밀번호 (수정할 경우에만 입력)
                        <small className="text-muted ms-2">
                            * 영문자, 숫자 포함 / 6자 이상 / 밑줄(_)만 특수문자 허용
                        </small>
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="form-control"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <div className="form-check mt-1">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="showPassword"
                            checked={showPassword}
                            onChange={() => setShowPassword((prev) => !prev)}
                        />
                        <label className="form-check-label" htmlFor="showPassword">
                            비밀번호 표시
                        </label>
                    </div>
                </div>

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

                <div className="mb-1">
                    <label>전화번호</label>
                </div>
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
