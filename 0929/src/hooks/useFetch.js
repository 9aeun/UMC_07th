import { useState } from "react";
import axios from "axios";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Axios 요청 옵션 병합
      const defaultOptions = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const mergedOptions = { ...defaultOptions, ...options };

      // Axios 요청
      const response = await axios({
        url,
        ...mergedOptions,
      });

      // 응답 데이터 반환
      return response.data; // Axios는 JSON을 자동으로 파싱
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong!");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
};
