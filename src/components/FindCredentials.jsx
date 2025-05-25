// src/components/FindCredentials.jsx
import React, { useState } from "react";

export default function FindCredentials() {
  // 아이디 찾기 폼 상태
  const [idForm, setIdForm] = useState({ name: "", email: "" });
  // 비밀번호 찾기 폼 상태
  const [pwForm, setPwForm] = useState({ userid: "", name: "" });

  const handleIdChange = (e) => {
    const { name, value } = e.target;
    setIdForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePwChange = (e) => {
    const { name, value } = e.target;
    setPwForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchID = (e) => {
    e.preventDefault();
    if (!idForm.name) {
      alert("이름을 입력해 주십시오.");
      return;
    }
    if (!idForm.email) {
      alert("E-Mail을 입력해 주십시오.");
      return;
    }
    window.open(
      `/member_searchid.html?name=${encodeURIComponent(idForm.name)}&email=${encodeURIComponent(idForm.email)}`,
      "",
      "width=300,height=210,top=100,left=100,scrollbars=no,status=no"
    );
    setIdForm({ name: "", email: "" });
  };

  const handleSearchPW = (e) => {
    e.preventDefault();
    if (!pwForm.userid) {
      alert("아이디를 입력해 주십시오.");
      return;
    }
    if (!pwForm.name) {
      alert("이름을 입력해 주십시오.");
      return;
    }
    window.open(
      `/member_searchpw.html?userid=${encodeURIComponent(pwForm.userid)}&name=${encodeURIComponent(pwForm.name)}`,
      "",
      "width=300,height=210,top=100,left=100,scrollbars=no,status=no"
    );
    setPwForm({ userid: "", name: "" });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-6 text-center">
        <h4 className="m-3 mt-5">아이디/암호 찾기</h4>
        <hr className="m-0" />
        <br /><br /><br />

        <table
          width="340"
          height="300"
          style={{ border: "4px solid #eeeeee" }}
          bgColor="#fcfcfc"
          className="mx-auto"
        >
          <tbody>
            {/* 아이디 찾기 폼 */}
            <tr>
              <td align="center">
                <form onSubmit={handleSearchID}>
                  <table className="mx-auto">
                    <tbody>
                      <tr height="30">
                        <td colSpan="2" className="ps-5">
                          <span style={{ fontSize: "1rem", color: "#B90319", fontWeight: "bold" }}>
                            아이디 찾기
                          </span>
                        </td>
                        <td></td>
                      </tr>
                      <tr height="45">
                        <td width="20%">이름</td>
                        <td width="50%">
                          <input
                            type="text"
                            name="name"
                            value={idForm.name}
                            onChange={handleIdChange}
                            className="form-control form-control-sm"
                            tabIndex="1"
                          />
                        </td>
                        <td width="30%" rowSpan="2">
                          <button
                            type="submit"
                            className="btn btn-sm btn-dark text-white mx-2 pt-4"
                            style={{ height: "75px", width: "75px" }}
                            tabIndex="3"
                          >
                            확인
                          </button>
                        </td>
                      </tr>
                      <tr height="45">
                        <td>E-Mail</td>
                        <td>
                          <input
                            type="text"
                            name="email"
                            value={idForm.email}
                            onChange={handleIdChange}
                            className="form-control form-control-sm"
                            tabIndex="2"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </td>
            </tr>

            {/* 구분선 */}
            <tr>
              <td>
                <hr className="m-0" />
              </td>
            </tr>

            {/* 비밀번호 찾기 폼 */}
            <tr>
              <td align="center">
                <form onSubmit={handleSearchPW}>
                  <table className="mx-auto">
                    <tbody>
                      <tr height="30">
                        <td colSpan="2" className="ps-5">
                          <span style={{ fontSize: "1rem", color: "#B90319", fontWeight: "bold" }}>
                            암호 찾기
                          </span>
                        </td>
                        <td></td>
                      </tr>
                      <tr height="45">
                        <td width="20%">ID</td>
                        <td width="50%">
                          <input
                            type="text"
                            name="userid"
                            value={pwForm.userid}
                            onChange={handlePwChange}
                            className="form-control form-control-sm"
                            tabIndex="4"
                          />
                        </td>
                        <td width="30%" rowSpan="2">
                          <button
                            type="submit"
                            className="btn btn-sm btn-secondary text-white mx-2 pt-4"
                            style={{ height: "75px", width: "75px" }}
                            tabIndex="6"
                          >
                            확인
                          </button>
                        </td>
                      </tr>
                      <tr height="45">
                        <td>이름</td>
                        <td>
                          <input
                            type="text"
                            name="name"
                            value={pwForm.name}
                            onChange={handlePwChange}
                            className="form-control form-control-sm"
                            tabIndex="5"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
