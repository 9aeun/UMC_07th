import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../api/axios-instance";
import SkeletonCard from "../components/Card/skeletonCard.jsx";
import Card from "../components/Card/card.jsx";
import * as S from "../styles/components/movies.style";

const MoviesPage = () => {
  const { category = "popular" } = useParams();
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태

  const { data, isLoading, isError, refetch } = useQuery(
    ["movies", category, currentPage], // queryKey에 페이지 포함
    async () => {
      const response = await axiosInstance.get(
        `/movie/${category}?language=ko-KR&page=${currentPage}`
      );
      return {
        results: response.data.results,
        totalPages: response.data.total_pages,
      };
    },
    {
      keepPreviousData: true, // 이전 데이터를 유지하여 로딩 상태 최소화
    }
  );

  const movies = data?.results || [];
  const totalPages = data?.totalPages || 0;

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      refetch(); // 새 데이터를 가져옵니다.
    }
  };

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
      </S.CardList>

      {/* 페이지네이션 버튼 */}
      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0", gap: "10px" }}>
        <S.PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            이전
        </S.PageButton>
        <S.Page>{currentPage} / {totalPages}</S.Page>
        <S.PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
        >
            다음
        </S.PageButton>
    </div>

    </div>
  );
};

export default MoviesPage;
