import { useEffect } from "react";
// import { axiosInstance } from "../api/axios-instance";
import useCustomFetch from "../hooks/useCustomFetch";

const HomePage = () => {
    const {data: movies, isLoading, isError} = useCustomFetch(`/movie/popular?language=ko-KR&page=1`);
    if(!isLoading) {
        return <div>
            <h1 style={{color: 'white'}}>로딩 중입니다...</h1>
        </div>
    }

    if(!isError) {
        return <div>
            <h1 style={{color: 'white'}}>! ERROR !</h1>
        </div>
    }

    return (


        <S.CardList>
            {movies.map((movie) => (
                <Card key={movie.id} movie={movie}/>
            ))}
        </S.CardList>
    );
};

export default HomePage;
