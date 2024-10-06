import React from 'react';
import styled from 'styled-components';

export const CardContainer = styled.div`
    margin-top: 10px;
    overflow-y: auto;
    text-align: flex-start;
    width : 150px;
    flex-wrap: wrap;   // 글씨 자동 줄바꿈
`;

export const MovieImage = styled.img`
    width: 150px;
    height: 200px;
    object-fit: cover;
    aspect-ratio: 3 / 4;
    border-radius: 10px;
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
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\./g, '년 ').replace(/ /g, ' ').trim();
        return date.replace('년 ', '년 ').replace('월', '월 ');
    };

    return (
        <CardContainer>
            <MovieImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <MovieTitle>{movie.title}</MovieTitle>
            <ReleaseDate>{formatDate(movie.release_date)}</ReleaseDate>
        </CardContainer>
    );
};

export default Card;
