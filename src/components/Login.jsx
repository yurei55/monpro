import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [uid, setUid] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!uid) {
      alert("아이디를 입력하세요.");
      return;
    }
    if (!pwd) {
      alert("암호를 입력하세요.");
      return;
    }

    // 실제 로그인 처리 (예: API 호출) 넣으면 됨
    alert(`로그인 시도: 아이디=${uid}, 비밀번호=${pwd}`);

    //임시
    const mockUser = {
      uid: "test@shingu.com",
      pwd: "qwerty",
      name: "테스트유저",
      tel1: "010",
      tel2: "1234",
      tel3: "4321",
      juso: "신구대",
      jusoDetail: "소프트",

    };
    localStorage.setItem("currentUser", JSON.stringify(mockUser));
    window.location.href = "/";
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