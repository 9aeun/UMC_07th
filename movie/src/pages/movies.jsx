import React from "react";
import Card from "../components/Card/card.jsx";
import { ClipLoader } from "react-spinners"; // 로딩 스피너
import * as S from '../styles/components/movies.style.js';
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { axiosInstance } from "../api/axios-instance";
import SkeletonCard from "../components/Card/skeletonCard.jsx";

const MoviesPage = () => {
    const { category = 'popular' } = useParams();

    // useInfiniteQuery로 무한 스크롤 구현
    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery(
        ['movies', category],
        async ({ pageParam = 1 }) => {
            const response = await axiosInstance.get(`/movie/${category}?language=ko-KR&page=${pageParam}`);
            return {
                results: response.data.results,
                nextPage: pageParam + 1,
                totalPages: response.data.total_pages,
            };
        },
        {
            getNextPageParam: (lastPage) =>
                lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined,
            refetchOnWindowFocus: false,
        }
    );

    // 영화 데이터 병합
    const movies = data?.pages.flatMap((page) => page.results) || [];

    // 로딩 상태 처리
    if (isLoading) {
        return (
            <S.CardList>
                {Array.from({ length: 10 }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </S.CardList>
        );
    }

    // 에러 상태 처리
    if (isError) {
        return <p>Error fetching movies: {error.message}</p>;
    }

    return (
        <div>
            {/* 영화 목록 */}
            <S.CardList>
                {movies.map((movie) => (
                    <Card key={movie.id} movie={movie} />
                ))}
                {/* SkeletonCard로 자리 표시 */}
                {isFetchingNextPage &&
                    Array.from({ length: 10 }).map((_, index) => (
                        <SkeletonCard key={`skeleton-${index}`} />
                    ))}
            </S.CardList>

            {isFetchingNextPage && (
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                    <ClipLoader color="#3498db" size={50} />
                </div>
            )}

            {hasNextPage && (
                <div
                    onClick={() => fetchNextPage()}
                    style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', margin: '20px 0' }}
                >
                    <p>데이터 로드 중...</p>
                </div>
            )}
        </div>
    );
};

export default MoviesPage;
