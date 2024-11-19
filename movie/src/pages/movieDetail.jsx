import React from 'react';
import { useParams } from 'react-router-dom';
import * as D from '../styles/components/movieDetail.style';
import { useQuery } from 'react-query';
import { axiosInstance } from '../api/axios-instance';
import SkeletonCard from '../components/Card/skeletonCard';

const MovieDetailPage = () => {
    const { movieId } = useParams();

    // 영화 세부 정보 가져오기
    const { data: movie, isLoading: isLoadingMovie, isError: isErrorMovie } = useQuery(
        ['movie', movieId],
        async () => {
            const response = await axiosInstance.get(`/movie/${movieId}?language=ko-KR`);
            return response.data;
        },
        {
            refetchOnWindowFocus: false,
        }
    );

    // 출연진 정보 가져오기
    const { data: credits, isLoading: isLoadingCredits, isError: isErrorCredits } = useQuery(
        ['movie', movieId, 'credits'],
        async () => {
            const response = await axiosInstance.get(`/movie/${movieId}/credits?language=ko-KR`);
            return response.data;
        },
        {
            refetchOnWindowFocus: false,
        }
    );

    // credits 데이터 확인
    const cast = credits?.cast || [];

    // 로딩 상태 처리
    if (isLoadingMovie || isLoadingCredits) {
        return <SkeletonCard />; // Skeleton UI 표시
    }

    // 에러 상태 처리
    if (isErrorMovie || isErrorCredits || !movie) {
        return <div>영화 데이터를 불러오는 중 오류가 발생했습니다.</div>;
    }

    return (
        <D.Container>
            {/* 영화 헤더 */}
            <D.MovieHeader $imageUrl={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}>
                <D.MovieInfo>
                    <D.MovieTitle>{movie.title}</D.MovieTitle>
                    <D.MovieDetail>평점 : {movie.vote_average}</D.MovieDetail>
                    <D.MovieDetail>개봉일 : {movie.release_date}</D.MovieDetail>
                    <D.MovieDetail>상영시간 : {movie.runtime}분</D.MovieDetail>
                    <D.MovieDetail>{movie.overview}</D.MovieDetail>
                </D.MovieInfo>
            </D.MovieHeader>

            {/* 출연진 섹션 */}
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
