import React from 'react';
import { useParams } from 'react-router-dom';
import * as D from '../styles/components/movieDetail.style';
import { useQuery } from 'react-query';
import { axiosInstance } from '../api/axios-instance';
import SkeletonCard from '../components/Card/skeletonCard';

interface Movie {
    id: number;
    title: string;
    backdrop_path: string;
    vote_average: number;
    release_date: string;
    runtime: number;
    overview: string;
}

interface Cast {
    cast_id: number;
    name: string;
    profile_path: string;
    character: string;
}

interface Credits {
    cast: Cast[];
}

const MovieDetailPage: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();

    const { data: movie, isLoading: isLoadingMovie, isError: isErrorMovie } = useQuery<Movie>(
        ['movie', movieId],
        async () => {
            const response = await axiosInstance.get<Movie>(`/movie/${movieId}?language=ko-KR`);
            return response.data;
        },
        { refetchOnWindowFocus: false }
    );

    const { data: credits, isLoading: isLoadingCredits, isError: isErrorCredits } = useQuery<Credits>(
        ['movie', movieId, 'credits'],
        async () => {
            const response = await axiosInstance.get<Credits>(`/movie/${movieId}/credits?language=ko-KR`);
            return response.data;
        },
        { refetchOnWindowFocus: false }
    );

    const cast = credits?.cast || [];

    if (isLoadingMovie || isLoadingCredits) {
        return <SkeletonCard />;
    }

    if (isErrorMovie || isErrorCredits || !movie) {
        return <div>영화 데이터를 불러오는 중 오류가 발생했습니다.</div>;
    }

    return (
        <D.Container>
            <D.MovieHeader $imageUrl={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}>
                <D.MovieInfo>
                    <D.MovieTitle>{movie.title}</D.MovieTitle>
                    <D.MovieDetail>평점 : {movie.vote_average}</D.MovieDetail>
                    <D.MovieDetail>개봉일 : {movie.release_date}</D.MovieDetail>
                    <D.MovieDetail>상영시간 : {movie.runtime}분</D.MovieDetail>
                    <D.MovieDetail>{movie.overview}</D.MovieDetail>
                </D.MovieInfo>
            </D.MovieHeader>

            <D.CastSection>
                <D.CastTitle>감독 / 출연</D.CastTitle>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {cast.length > 0 ? (
                        cast.slice(0, 10).map((actor) => (
                            <D.CastItem key={actor.cast_id}>
                                <D.CastImage
                                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                                    alt={actor.name}
                                />
                                <D.CastName>{actor.name}</D.CastName>
                                <D.ActorName>{actor.character}</D.ActorName>
                            </D.CastItem>
                        ))
                    ) : (
                        <div>출연진 정보가 없습니다.</div>
                    )}
                </div>
            </D.CastSection>
        </D.Container>
    );
};

export default MovieDetailPage;
