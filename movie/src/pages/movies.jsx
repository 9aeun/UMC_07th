import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../api/axios-instance";
import SkeletonCard from "../components/Card/skeletonCard.jsx";
import Card from "../components/Card/card.jsx";
import { ClipLoader } from "react-spinners"; // 로딩 스피너
import * as S from "../styles/components/movies.style";

const MoviesPage = () => {
  const { category = "popular" } = useParams();
  const observerRef = useRef(); // Intersection Observer용 Ref

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["movies", category],
    async ({ pageParam = 1 }) => {
      const response = await axiosInstance.get(
        `/movie/${category}?language=ko-KR&page=${pageParam}`
      );
      return {
        results: response.data.results,
        nextPage: pageParam + 1,
        totalPages: response.data.total_pages,
      };
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.nextPage <= lastPage.totalPages) {
          return lastPage.nextPage;
        }
        return undefined;
      },
    }
  );

  // 병합된 영화 데이터
  const movies = data?.pages.flatMap((page) => page.results) || [];

  // Intersection Observer 설정
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("Fetching next page...");
          fetchNextPage();
        }
      },
      { threshold: 0.1 } // 요소가 10% 이상 보이면 트리거
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <S.CardList>
        {Array.from({ length: 14 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </S.CardList>
    );
  }

  if (isError) {
    return <p>Error loading movies!</p>;
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

      {/* 로딩 스피너 */}
      {isFetchingNextPage && (
        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
          <ClipLoader color="#3498db" size={50} />
        </div>
      )}

      {/* 감시 요소 */}
      <div
        ref={observerRef} // Intersection Observer가 감시할 요소
        style={{ height: "1px", backgroundColor: "transparent" }}
      ></div>

      {!hasNextPage && (
        <div style={{ textAlign: "center", color: "white", margin: "20px 0" }}>
          <p>더 이상 데이터가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
