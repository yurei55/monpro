// src/api/axios.js
import axios from "axios";

// 개발 환경 기준 API 서버 주소
const instance = axios.create({
    baseURL: "http://localhost:8080", // Spring Boot 서버 주소
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // 필요 시 쿠키 포함 (백엔드에서 허용 설정 필요)
});

export default instance;
