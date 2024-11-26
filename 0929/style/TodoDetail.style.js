import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: "Arial", sans-serif;
  text-align: center;
`;

export const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    content: "⚡";
    margin: 0 8px;
    color: #fbbd08;
  }
`;

export const DetailBox = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;

  p {
    margin: 10px 0;
    font-size: 16px;
    line-height: 1.5;
  }

  strong {
    font-weight: bold;
  }
`;

export const Button = styled.button`
  background-color: #fbbd08;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #e0a907;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
