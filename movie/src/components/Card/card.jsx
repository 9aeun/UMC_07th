import React from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate import 추가
import styled from 'styled-components';

export const CardContainer = styled.div`
    margin-top: 10px;
    overflow-y: auto none;
    text-align: flex-start;
    width: 150px;
    flex-wrap: wrap;
    transition: transform 0.3s ease, background-color 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

export const MovieImage = styled.img`
    width: 150px;
    height: 200px;
    object-fit: cover;
    aspect-ratio: 3 / 4;
    border-radius: 10px;
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 0.7;
    }
`;

export const MovieTitle = styled.h3`
    font-size: 15px;
    margin: 0;
    color: white;
`;

export const ReleaseDate = styled.p`
    font-size: 12px;
    color: white;
    margin: 0;
`;

const Card = ({ movie }) => {
    const navigate = useNavigate();  // useNavigate hook 사용

    const handleClick = () => {
        navigate(`/movie/details/${movie.id}`);  // 영화 ID로 동적 경로로 이동
    };
    console.log('movie: ', movie);
    console.log('movie ID: ', movie.id);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\./g, '년 ').replace(/ /g, ' ').trim();
        return date.replace('년 ', '년 ').replace('월', '월 ');
    };

    return (
        <CardContainer onClick={handleClick}>
            <MovieImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <MovieTitle>{movie.title}</MovieTitle>
            <ReleaseDate>{formatDate(movie.release_date)}</ReleaseDate>
        </CardContainer>
    );
};

export default Card;
