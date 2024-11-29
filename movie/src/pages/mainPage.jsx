import React from "react";
import { useQuery } from "react-query";
import { axiosInstance } from "../api/axios-instance";
import MainCard from "../components/Card/MainCard";
import * as S from "../styles/components/movies.style";

const MainPage = () => {
  const { data, isLoading, isError } = useQuery(
    ["trendingMovies"],
    async () => {
      const response = await axiosInstance.get("/movie/popular?language=ko-KR");
      return response.data.results;
    }
  );

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>영화를 불러오는 데 실패했습니다.</p>;

  return (
    <>
        <h1 style={{color: "white"}}>Trending Movie</h1>
        <S.CardList>
            {data.map((movie) => (
            <MainCard key={movie.id} movie={movie} />
            ))}
        </S.CardList>   
    </>
  );
};

export default MainPage;
