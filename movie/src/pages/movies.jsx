import React, { useEffect, useState } from "react";
import Card from "../components/Card/card.jsx";
import * as S from '../styles/components/movies.style.js';
import { useParams } from "react-router-dom";
import { axiosInstance } from "../api/axios-instance.js";

const MoviesPage = () => {
    const { category = 'popular' } = useParams();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await axiosInstance.get(`/movie/${category}?language=ko-KR&page=1`);
                setMovies(response.data.results || []);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        getMovies();
    }, [category]);

    return (
        <S.CardList>
            {movies.map((movie) => (
                <Card key={movie.id} movie={movie} />
            ))}
        </S.CardList>
    );
};

export default MoviesPage;
