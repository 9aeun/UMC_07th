import styled from "styled-components";

export const OuterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0; /* 배경 색상 */
`;

export const Container = styled.div`
  max-width: 600px; /* 전체 컨테이너 최대 너비 */
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 0 auto;
  text-align: start;
  font-family: "Arial", sans-serif;
  border-radius: 10px; /* 약간의 둥근 모서리 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 박스 그림자 */
  overflow: hidden; /* 내용이 튀어나오지 않도록 설정 */
`;

export const Header = styled.h1`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase; /* 대문자 스타일 */
  letter-spacing: 2px;

  &::before,
  &::after {
    content: "⚡";
    margin: 0 8px;
    color: #fbbd08;
    animation: pulse 1s infinite; /* 애니메이션 추가 */
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

export const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

export const TextArea = styled.textarea`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  resize: none;
  height: 50px;
  box-sizing: border-box;
`;

export const Button = styled.button`
  width: 100%;
  background-color: #fbbd08;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0a907;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const TodoList = styled.div`
  margin-top: 20px;
  width: 100%;
  max-height: 60vh; /* 리스트의 최대 높이 제한 */
  overflow-y: auto; /* 세로 스크롤 활성화 */
  padding: 10px;
  box-sizing: border-box;
`;

export const TodoItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  box-sizing: border-box;
`;

export const TodoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  width: 70%; /* 내용이 Actions를 침범하지 않도록 제한 */

  p {
    margin: 0;
    font-size: 14px;
    word-break: break-word;
    line-height: 1.5;
    color: #333;
  }
`;

export const TodoActions = styled.div`
  display: flex;
  gap: 10px;
`;

export const Checkbox = styled.input`
  transform: scale(1.2);
  cursor: pointer;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  text-align: center;
  gap: 10px;

  p {
    font-size: 14px;
    color: #555;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  text-align: center;
  gap: 10px;

  p {
    font-size: 14px;
    color: red;
  }
`;
