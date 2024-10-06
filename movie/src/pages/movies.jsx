import Card from "../components/Card/card.jsx";
import * as S from '../styles/components/movies.style.js';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // useParams import 추가

const MoviesPage = () => {
    const { category = 'popular' } = useParams();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=1`, {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTNkYWIyMDkxMzI2Y2Y3NTkwNTAwYjQyODNkNjZkNyIsIm5iZiI6MTcyNjE0MTU3Ny42MDM2ODcsInN1YiI6IjY0MzVmY2Y2NjUxZmNmMDBkM2RhYzNmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cFPsPRHPidq2OnJ3U-3wHJYhnGajDFqUsM8XJ_a_0bw`
                    }
                });
                setMovies(response.data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        getMovies();
        console.log("category: ", category);
    }, [category]);

    return (
        <S.CardList>
            {movies.map((movie) => (
                <Card key={movie.id} movie={movie}/>
            ))}
        </S.CardList>
    );
};

export default MoviesPage;
