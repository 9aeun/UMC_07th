import React from 'react';
import { useParams } from 'react-router-dom';
import * as D from '../styles/components/movieDetail.style'; 
import useCustomFetch from '../hooks/useCustomFetch';

const MovieDetailPage = () => {
    const { movieId } = useParams();  
    const { data: movie, isLoading: isLoadingMovie, isError: isErrorMovie } = useCustomFetch(`/movie/${movieId}?language=ko-KR`);
    const { data: credits, isLoading: isLoadingCredits, isError: isErrorCredits } = useCustomFetch(`/movie/${movieId}/credits?language=ko-KR`);

    // credits 데이터 확인
    console.log("Credits Data: ", credits);
    
    // cast 데이터를 안전하게 추출
    const cast = credits?.cast || [];
    console.log("Cast Data: ", cast);

    // 로딩 및 오류 처리
    if (isLoadingMovie || isLoadingCredits) {
        return <div>로딩 중...</div>;  
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
                                <D.CastImage src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
                                <D.CastName>{actor.name}</D.CastName>
                                <D.ActorName>{actor.character}</D.ActorName>
                            </D.CastItem>
                        ))
                    ) : (
                        <div>출연진 정보가 없습니다.</div> // 캐스트 정보가 없을 때 표시
                    )}
                </div>
            </D.CastSection>
        </D.Container>
    );
};

export default MovieDetailPage;
