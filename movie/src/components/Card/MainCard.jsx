import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import
import * as S from "../../styles/components/mainCard.style"; // 스타일 파일 import

const MainCard = ({ movie }) => {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate(`/movie/details/${movie.id}`); // 상세 페이지로 이동
    };
  
    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      const date = new Date(dateString)
        .toLocaleDateString("ko-KR", options)
        .replace(/\./g, "년 ")
        .replace(/ /g, " ")
        .trim();
      return date.replace("년 ", "년 ").replace("월", "월 ");
    };
  
    return (
      <S.CardContainer onClick={handleClick}>
        <S.MovieImage
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <S.Overlay>
          <S.MovieInfo>
            <S.MovieTitle>{movie.title}</S.MovieTitle>
            <S.MovieDetails>
              평점: ★ {movie.vote_average}
              <br />
              개봉일: {formatDate(movie.release_date)}
            </S.MovieDetails>
          </S.MovieInfo>
        </S.Overlay>
      </S.CardContainer>
    );
  };
  
  export default MainCard;