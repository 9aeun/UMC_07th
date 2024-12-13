import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
    padding: 20px;
`;

export const MovieHeader = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 400px;
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;


export const MovieInfo = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 1;
`;

export const MovieTitle = styled.h1`
    font-size: 36px;
    margin: 0;
`;

export const MovieDetail = styled.p`
    width: 50%;
    font-size: 18px;
    margin: 5px 0;
    color: white;
`;

export const CastSection = styled.div`
    width: 100%;
    margin-top: 20px;
`;

export const CastTitle = styled.h2`
    font-size: 24px;
    border-bottom: 1px solid white;
    padding-bottom: 10px;
`;

export const CastItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 120px;
    height: 170px;
    margin-bottom: 10px;
`;

export const CastImage = styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 5px;
    border: solid 2px white;
`;

export const CastName = styled.p`
    font-size: 12px;
    text-align: center;
    margin-bottom: 1px;
`

export const ActorName = styled.p`
    font-size: 12px;
    text-align: center;
    color: #999999;
    margin-top: 0;
    margin-bottom: 0;
`;
