import axios, { AxiosInstance } from 'axios';

// 환경 변수가 올바르게 정의되었는지 확인
const baseURL: string = import.meta.env.VITE_MOVIE_API_BASE_URL;

if (!baseURL) {
    throw new Error("VITE_MOVIE_API_BASE_URL 환경 변수가 설정되지 않았습니다.");
}

// Axios 인스턴스 생성 및 타입 명시
const api: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
