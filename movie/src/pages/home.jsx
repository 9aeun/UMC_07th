import React from "react";
import { useInfiniteQuery } from "react-query";
import { axiosInstance } from "../api/axios-instance";
import Card from "../components/Card/card";
import SkeletonCard from "../components/Card/skeletonCard.jsx";
import * as S from '../styles/components/movies.style.js';

const HomePage = () => {
    // useInfiniteQuery를 사용하여 무한 스크롤 구현
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery(
        ['movies', 'popular'], // queryKey 명확히 설정
        async ({ pageParam = 1 }) => {
            const response = await axiosInstance.get(`/movie/popular?language=ko-KR&page=${pageParam}`);
            
            // 응답 데이터 확인
            console.log('API Response:', response.data);

            return {
                results: response.data.results, // 현재 페이지 데이터
                nextPage: pageParam + 1, // 다음 페이지 번호
                totalPages: response.data.total_pages, // 총 페이지 수
            };
        },
        {
            getNextPageParam: (lastPage) => {
                // lastPage 확인
                console.log('Last Page:', lastPage);

                // 다음 페이지가 총 페이지를 초과하지 않으면 반환
                if (lastPage.nextPage <= lastPage.totalPages) {
                    return lastPage.nextPage;
                }
                return undefined;
            },
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
        return (
            <div>
                <h1 style={{ color: 'white' }}>! ERROR !</h1>
            </div>
        );
    }

    return (
        <div>
            {/* 영화 목록 */}
            <S.CardList>
                {movies.map((movie) => (
                    <Card key={movie.id} movie={movie} />
                ))}
                {/* 추가 데이터 로드 중 SkeletonCard */}
                {isFetchingNextPage &&
                    Array.from({ length: 10 }).map((_, index) => (
                        <SkeletonCard key={`skeleton-${index}`} />
                    ))}
            </S.CardList>

            {/* 무한 스크롤 로딩 */}
            {hasNextPage && (
                <div
                    style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}
                    onClick={() => fetchNextPage()}
                >
                    <p style={{ cursor: 'pointer', color: 'white' }}>
                        {isFetchingNextPage ? "로딩 중..." : "더 보기"}
                    </p>
                </div>
            )}
        </div>
    );
};

export default HomePage;
