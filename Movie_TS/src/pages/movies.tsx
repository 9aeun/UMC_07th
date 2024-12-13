import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../api/axios-instance";
import SkeletonCard from "../components/Card/skeletonCard";
import Card from "../components/Card/card";
import * as S from "../styles/components/movies.style";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}

interface ApiResponse {
    results: Movie[];
    total_pages: number;
}

const MoviesPage: React.FC = () => {
    const { category = "popular" } = useParams<{ category?: string }>();
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, isError, refetch } = useQuery<ApiResponse>(
        ["movies", category, currentPage],
        async () => {
            const response = await axiosInstance.get<ApiResponse>(
                `/movie/${category}?language=ko-KR&page=${currentPage}`
            );
            return response.data;
        },
        { keepPreviousData: true }
    );

    const movies = data?.results || [];
    const totalPages = data?.total_pages || 0;

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            refetch();
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
