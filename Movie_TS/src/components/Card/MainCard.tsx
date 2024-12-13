import { useNavigate } from "react-router-dom";
import * as S from "../../styles/components/mainCard.style"

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
}

interface MainCardProps {
    movie: Movie;
}

const MainCard: React.FC<MainCardProps> = ({ movie }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/details/${movie.id}`);
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
        const date = new Date(dateString)
            .toLocaleDateString("ko-KR", options)
            .replace(/\./g, "년 ")
            .replace(/ /g, " ")
            .trim();
        return date.replace("년 ", "년 ").replace("월", "월 ");
    };

    return (
        <S.CardContainer onClick={handleClick}>
            <S.MovieImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
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
