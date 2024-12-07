import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #6242fc;
  color: white;
  width: 100%;
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const CartIcon = styled.div`
  font-size: 24px;
  position: relative;
  cursor: pointer;

  span {
    position: absolute;
    top: -5px;
    right: -10px;
    background: #ff6262;
    color: white;
    font-size: 12px;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
`;

export const Playlist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eaeaea;

  &:last-child {
    border-bottom: none;
  }
`;

export const ItemInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const AlbumArt = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 10px;
`;

export const AlbumDetails = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
  }

  p {
    font-size: 14px;
    color: gray;
    margin: 0;
  }
`;

export const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-right: 20px;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;

  button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    margin: 0 5px;
  }

  span {
    font-size: 16px;
    font-weight: bold;
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  button {
    margin-top: 10px;
    padding: 10px 20px;
    background: #6242fc;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
  }
`;

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
`;

export const CartSummary = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;
    color: #6242fc;
    margin-right: 10px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 20px;

    p {
      margin: 0;
      font-size: 14px;
      font-weight: bold;
    }
  }

  button {
    background: #6242fc;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background: #502bb3;
    }
  }
`;
