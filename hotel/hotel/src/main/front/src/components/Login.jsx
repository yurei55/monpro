import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true; // ✅ 쿠키 포함 설정 (세션 유지)


export default function Login() {
  const [uid, setUid] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!uid) {
      alert("아이디를 입력하세요.");
      return;
    }
    if (!pwd) {
      alert("암호를 입력하세요.");
      return;
    }

    try {
      // ✅ 로그인 요청
      await axios.post("/api/login", {
        email: uid,
        password: pwd
      }, {
        withCredentials: true
      });

      // ✅ 로그인 성공 후 사용자 정보 가져오기
      const res = await axios.get("/api/members/me", {
        withCredentials: true
      });

      // ✅ 로컬스토리지 저장 후 리다이렉트
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("로그인 실패: " + (err.response?.data?.message || err.message));
    }
  };

  return (
      <form onSubmit={handleSubmit} className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h3 className="mb-4">회원 로그인</h3>
            <hr className="mb-5" />

            <table width="340" style={{ border: "4px solid #e2e2e2", background: "#fcfcfc" }}>
              <tbody>
              <tr>
                <td className="p-3">
                  <table className="table table-borderless">
                    <tbody>
                    <tr>
                      <td width="20%">아이디</td>
                      <td width="50%">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            value={uid}
                            onChange={(e) => setUid(e.target.value)}
                        />
                      </td>
                      <td width="30%" rowSpan="2">
                        <button
                            type="submit"
                            className="btn btn-sm btn-dark text-white"
                            style={{ height: "75px", width: "75px" }}
                        >
                          로그인
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>암호</td>
                      <td>
                        <input
                            type="password"
                            className="form-control form-control-sm"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <hr className="m-0" />
                </td>
              </tr>
              <tr>
                <td className="text-center p-2">
                  <Link to="/find" className="btn btn-sm btn-outline-secondary">
                    아이디 또는 암호를 잃어버리셨나요?
                  </Link>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
  );
}
