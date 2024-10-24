import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios-instance";

const useCustomFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get(url);
                console.log('API Response:', response); // 추가된 로그
                setData(response.data); // data를 response.data로 설정해야 합니다.
            } catch (error) {
                console.error('Fetch error:', error); // 에러 로그 추가
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [url]);

    return { data, isLoading, isError };
}

export default useCustomFetch;
