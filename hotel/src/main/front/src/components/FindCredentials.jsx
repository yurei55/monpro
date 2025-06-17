import React, { useState } from "react";
import axios from "axios";
import ResetPasswordPopup from './ResetPasswordPopup'; // 경로 확인 필수

export default function FindCredentials() {
  const [idForm, setIdForm] = useState({ name: "", tel1: "", tel2: "", tel3: "" });
  const [pwForm, setPwForm] = useState({ userid: "", name: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleIdChange = (e) => {
    const { name, value } = e.target;
    setIdForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePwChange = (e) => {
    const { name, value } = e.target;
    setPwForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchID = async (e) => {
    e.preventDefault();

    const { name, tel1, tel2, tel3 } = idForm;
    if (!name || !tel1 || !tel2 || !tel3) {
      alert("이름과 전화번호를 모두 입력해 주세요.");
      return;
    }

    const phoneNumber = `${tel1}-${tel2}-${tel3}`;

    try {
      const res = await axios.get("/api/members/find-id", {
        params: { name, phoneNumber },
      });

      const userId = res.data.userId;
      if (userId) {
        alert(`회원님의 아이디는 "${userId}" 입니다.`);
      } else {
        alert("입력하신 정보와 일치하는 회원이 없습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("아이디 찾기 중 오류가 발생했습니다.");
    }
  };

  const handleSearchPW = async (e) => {
    e.preventDefault();

    const { userid, name } = pwForm;
    if (!userid || !name) {
      alert("아이디와 이름을 모두 입력해 주세요.");
      return;
    }

    try {
      const res = await axios.get("/api/members/verify-for-reset", {
        params: { email: userid, name },
      });

      const verified = res.data.verified;
      if (verified) {
        setResetEmail(userid);
        setShowPopup(true); // ✅ 팝업 열기
      } else {
        alert("입력하신 정보와 일치하는 회원이 없습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("비밀번호 확인 중 오류가 발생했습니다.");
    }
  };

  return (
      <div className="row justify-content-center">
          <div className="col-12 col-md-6 text-center" style={{ maxWidth: "500px" }}>
          <h4 className="m-3 mt-5">아이디 / 비밀번호 찾기</h4>
          <hr className="m-0" />
          <br /><br />

          {/* 아이디 찾기 박스 */}
          <div
              className="p-4 mb-4"
              style={{
                backgroundColor: "#fcfcfc",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
          >
            <form onSubmit={handleSearchID}>
              <div className="text-start mb-3" >
          <span style={{ fontSize: "1.1rem", color: "#bb0f23", fontWeight: "bold" }}>
            아이디 찾기
          </span>
              </div>
              <div className="mb-2 text-start">이름</div>
              <input
                  type="text"
                  name="name"
                  value={idForm.name}
                  onChange={handleIdChange}
                  className="form-control form-control-sm mb-2"
              />
              <div className="mb-2 text-start">전화번호</div>
              <div className="d-flex gap-2 mb-3">
                <input type="text" name="tel1" value={idForm.tel1} onChange={handleIdChange} maxLength="3" className="form-control form-control-sm" />
                <input type="text" name="tel2" value={idForm.tel2} onChange={handleIdChange} maxLength="4" className="form-control form-control-sm" />
                <input type="text" name="tel3" value={idForm.tel3} onChange={handleIdChange} maxLength="4" className="form-control form-control-sm" />
              </div>
              <button type="submit" className="btn btn-sm btn-dark text-white w-100">아이디 확인</button>
            </form>
          </div>

          {/* 비밀번호 찾기 박스 */}
          <div
              className="p-4 mb-4"
              style={{
                backgroundColor: "#fcfcfc",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
          >
            <form onSubmit={handleSearchPW}>
              <div className="text-start mb-3">
          <span style={{ fontSize: "1.1rem", color: "#B90319", fontWeight: "bold" }}>
            비밀번호 찾기
          </span>
              </div>
              <div className="mb-2 text-start">ID</div>
              <input
                  type="text"
                  name="userid"
                  value={pwForm.userid}
                  onChange={handlePwChange}
                  className="form-control form-control-sm mb-2"
              />
              <div className="mb-2 text-start">이름</div>
              <input
                  type="text"
                  name="name"
                  value={pwForm.name}
                  onChange={handlePwChange}
                  className="form-control form-control-sm mb-3"
              />
              <button type="submit" className="btn btn-sm btn-dark text-white w-100">비밀번호 확인</button>
            </form>
          </div>

          {/* 팝업 */}
          {showPopup && (
              <ResetPasswordPopup
                  email={resetEmail}
                  onClose={() => setShowPopup(false)}
              />
          )}
        </div>
      </div>
  );
}
