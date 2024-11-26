import { useState } from "react";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const defaultOptions = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const mergedOptions = { ...defaultOptions, ...options };

      const response = await fetch(url, mergedOptions);

      if (!response.ok) {
        const errorMessage = `HTTP error! status: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }

      // 응답이 JSON 형식인지 확인
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return data; // JSON 데이터 반환
      } else {
        const textData = await response.text(); // JSON이 아니면 텍스트로 처리
        throw new Error(`Unexpected response format: ${textData}`);
      }
    } catch (err) {
      setError(err.message || "Something went wrong!");
      console.error("Fetch error:", err);
      throw err; // 에러를 다시 throw하여 호출자가 핸들링 가능
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
};
