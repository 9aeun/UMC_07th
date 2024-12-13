import React from "react";
import { useInfiniteQuery } from "react-query";
import { axiosInstance } from "../api/axios-instance";
import Card from "../components/Card/card";
import SkeletonCard from "../components/Card/skeletonCard";
import * as S from "../styles/components/movies.style";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string; // 개봉일 속성 추가
  }
  

interface ApiResponse {
    results: Movie[];
    total_pages: number;
    nextPage?: number; // nextPage를 선택적으로 추가
  }
  

  const HomePage: React.FC = () => {
    const {
      data,
      isLoading,
      isError,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    } = useInfiniteQuery<ApiResponse>(
      ["movies", "popular"],
      async ({ pageParam = 1 }) => {
        const response = await axiosInstance.get<ApiResponse>(
          `/movie/popular?language=ko-KR&page=${pageParam}`
        );
        const { results, total_pages } = response.data;
        return {
          results,
          total_pages,
          nextPage: pageParam + 1 <= total_pages ? pageParam + 1 : undefined,
        };
      },
      {
        getNextPageParam: (lastPage) =>
          lastPage.nextPage, // nextPage가 undefined이면 다음 페이지가 없음을 의미
      }
    );
  
    const movies = data?.pages.flatMap((page) => page.results) || [];
  
    if (isLoading) {
      return (
        <S.CardList>
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </S.CardList>
      );
    }
  
    if (isError) {
      return <div><h1 style={{ color: "white" }}>! ERROR !</h1></div>;
    }
  
    return (
      <div>
        <S.CardList>
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
          {isFetchingNextPage &&
            Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
        </S.CardList>
        {hasNextPage && (
          <div
            style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
            onClick={() => fetchNextPage()}
          >
            <p style={{ cursor: "pointer", color: "white" }}>
              {isFetchingNextPage ? "로딩 중..." : "더 보기"}
            </p>
          </div>
        )}
      </div>
    );
  };
  
  export default HomePage;
  