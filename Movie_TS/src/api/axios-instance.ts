import axios, { AxiosInstance } from "axios";

// 환경 변수 타입 명시
const TMDB_TOKEN: string = import.meta.env.VITE_TMDB_TOKEN;
const MOVIE_API_URL: string = import.meta.env.VITE_MOVIE_API_URL;

// 환경 변수 유효성 검사
if (!TMDB_TOKEN) {
    throw new Error("VITE_TMDB_TOKEN 환경 변수가 설정되지 않았습니다.");
}

if (!MOVIE_API_URL) {
    throw new Error("VITE_MOVIE_API_URL 환경 변수가 설정되지 않았습니다.");
}

// Axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
    },
    baseURL: MOVIE_API_URL,
});

// GET (추가 구현 필요시 함수 정의)
export { axiosInstance };
