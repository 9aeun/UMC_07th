import * as S from "../styles/components/category.style";
import nowPlayingImage from "../assets/now.jpg";
import popularImage from "../assets/popular.jpg";
import topRatedImage from "../assets/high.jpg";
import upcomingImage from "../assets/pre.jpg";

const CategoryPage = () => {
    return (
        <>
            <S.Category>CATEGORY</S.Category>
            <S.CategoryBox>
                <S.ImageLink to="/movie/now_playing" bgImage={nowPlayingImage}>
                    <S.Overlay>현재 상영중인</S.Overlay>
                </S.ImageLink>
                <S.ImageLink to="/movie/popular" bgImage={popularImage}>
                    <S.Overlay>인기있는</S.Overlay>
                </S.ImageLink>
                <S.ImageLink to="/movie/top_rated" bgImage={topRatedImage}>
                    <S.Overlay>높은 평가를 받은</S.Overlay>
                </S.ImageLink>
                <S.ImageLink to="/movie/upcoming" bgImage={upcomingImage}>
                    <S.Overlay>개봉 예정중인</S.Overlay>
                </S.ImageLink>
            </S.CategoryBox>
        </>
    );
};

export default CategoryPage;
