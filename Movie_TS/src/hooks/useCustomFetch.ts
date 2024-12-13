import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios-instance";

interface FetchState<T> {
    data: T;
    isLoading: boolean;
    isError: boolean;
}

const useCustomFetch = <T = any>(url: string) => {
    const [state, setState] = useState<FetchState<T>>({
        data: [] as T,
        isLoading: false,
        isError: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            setState((prev) => ({ ...prev, isLoading: true }));
            try {
                const response = await axiosInstance.get<T>(url);
                console.log("API Response:", response); // 추가된 로그
                setState({ data: response.data, isLoading: false, isError: false });
            } catch (error) {
                console.error("Fetch error:", error); // 에러 로그 추가
                setState((prev) => ({ ...prev, isError: true, isLoading: false }));
            }
        };

        fetchData();
    }, [url]);

    return state;
};

export default useCustomFetch;
