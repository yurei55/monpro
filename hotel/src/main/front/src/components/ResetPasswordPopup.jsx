import React, { useState } from "react";
import axios from "axios";

export default function ResetPasswordPopup({ email, onClose }) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isValidPassword = (password) => {
        if (password.length < 6) return false;
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const onlyAllowed = /^[a-zA-Z0-9_]+$/.test(password);
        return hasLetter && hasDigit && onlyAllowed;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            alert("모든 항목을 입력해 주세요.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (!isValidPassword(newPassword)) {
            alert("비밀번호는 6자 이상, 영문자와 숫자를 포함하고 밑줄(_) 외 특수문자는 사용할 수 없습니다.");
            return;
        }

        try {
            const res = await axios.post("/api/members/reset-password", {
                email,
                newPassword,
            });

            alert("✅ 비밀번호가 성공적으로 변경되었습니다.");
            onClose();
        } catch (err) {
            if (err.response?.data?.error) {
                alert("❌ " + err.response.data.error);
            } else {
                alert("❌ 비밀번호 변경 중 오류가 발생했습니다.");
            }
            console.error(err);
        }
    };

    return (
        <div style={popupStyle}>
            <form onSubmit={handleSubmit}>
                <h5>🔐 새 비밀번호 설정</h5>
                <input
                    type="password"
                    placeholder="새 비밀번호"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-control my-2"
                />
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control my-2"
                />
                <div className="d-flex justify-content-end mt-3">
                    <button type="submit" className="btn btn-sm btn-dark me-2">확인</button>
                    <button type="button" className="btn btn-sm btn-secondary" onClick={onClose}>취소</button>
                </div>
            </form>
        </div>
    );
}

const popupStyle = {
    position: "fixed",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -30%)",
    backgroundColor: "#fff",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    zIndex: 9999,
    width: "300px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
};
