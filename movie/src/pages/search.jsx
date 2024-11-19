import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';  
import * as S from "../styles/searchPage.style";
import * as M from "../styles/components/movies.style";
import Card from '../components/Card/card';
import { axiosInstance } from '../api/axios-instance';
import SkeletonCard from '../components/Card/skeletonCard';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false); // 로딩 상태 추가
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        handleSearch(e.target.value);
    };

    // debounce 적용: 250ms 후에 searchMovies 함수 호출
    const searchMovies = useCallback(
        debounce(async (query) => {
            if (!query) {
                setError("검색어를 입력해주세요.");
                setMovies([]);
                setLoading(false);
                return;
            }

            setLoading(true); // 로딩 시작

            try {
                const response = await axiosInstance.get('/search/movie', {
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
            } catch (error) {
                console.error("API 요청 오류:", error);
                setError("영화 검색에 실패했습니다. 다시 시도해주세요.");
            } finally {
                setLoading(false); // 로딩 종료
            }
        }, 500),
        []
    );

    const handleSearch = () => {
        searchMovies(query);
    };

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