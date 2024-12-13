import React, { useState, useCallback } from "react";
import { debounce } from "lodash";
import * as S from "../styles/searchPage.style";
import * as M from "../styles/components/movies.style";
import Card from "../components/Card/card";
import { axiosInstance } from "../api/axios-instance";
import SkeletonCard from "../components/Card/skeletonCard";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}

const SearchPage: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        searchMovies(value); // 바로 debounce된 searchMovies 호출
    };
    
    const handleSearch = () => {
        searchMovies(query); // 버튼 클릭 시 현재 query 값 검색
    };
    

    const searchMovies = useCallback(
        debounce(async (query: string) => {
            if (!query) {
                setError("검색어를 입력해주세요.");
                setMovies([]);
                setLoading(false);
                return;
            }

            setLoading(true);

            try {
                const response = await axiosInstance.get<{ results: Movie[] }>('/search/movie', {
                    params: {
                        query,
                        language: 'ko-KR',
                    },
                });

                const results = response.data.results;
                if (results.length > 0) {
                    setMovies(results);
                    setError(null);
                } else {
                    setMovies([]);
                    setError(`검색어 '${query}'에 해당하는 데이터가 없습니다.`);
                }
            } catch (err) {
                console.error("API 요청 오류:", err);
                setError("영화 검색에 실패했습니다. 다시 시도해주세요.");
            } finally {
                setLoading(false);
            }
        }, 500),
        []
    );

    return (
        <S.SearchPageContainer>
            <S.SearchContainer>
                <S.InputBox
                    value={query}
                    onChange={handleInputChange}
                    placeholder="영화 제목을 입력해주세요..."
                />
                <S.SearchButton onClick={handleSearch}>검색</S.SearchButton>
            </S.SearchContainer>

            {error && <h1 style={{ marginTop: '100px' }}>{error}</h1>}

            {loading ? (
                <M.CardList style={{ marginTop: '100px' }}>
                    {Array.from({ length: 12 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </M.CardList>
            ) : (
                <M.CardList style={{ marginTop: '100px' }}>
                    {movies.map(movie => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </M.CardList>
            )}
        </S.SearchPageContainer>
    );
};

export default SearchPage;
