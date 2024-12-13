import styled from "styled-components";

export const CardContainer = styled.div`
  position: relative;
  width: 200px;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  transition: opacity 0.3s ease;

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

export const MovieInfo = styled.div`
  padding: 10px;
`;

export const MovieTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 10px;
`;

export const MovieDetails = styled.p`
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
`;
