import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px; /* 최대 너비를 설정하여 중앙 정렬 */
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 0 auto; /* 가로 중앙 정렬 */
  text-align: start;
  font-family: 'Arial', sans-serif;
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
    content: '⚡';
    margin: 0 8px;
    color: #fbbd08;
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
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  resize: none;
  height: 20px;
  color: black;
`;

export const Button = styled.button`
  width: 100%;
  background-color: #fbbd08;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  box-sizing: border-box;

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
`;

export const TodoItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const TodoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  p {
    margin: 0;
    font-size: 14px;
    word-break: break-word;
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
`;