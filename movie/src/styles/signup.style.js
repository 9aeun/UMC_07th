import styled from "styled-components";

export const LoginContainer = styled.div`
    width: 100% - 150px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding: 20px;
    justify-content: center; /* 수직 가운데 정렬 */
`;

export const Intro = styled.h3`
    font-size: 30px;
    margin: 0;
    padding: 0;
    text-align: center;
    font-weight: 800;
    margin-bottom: 30px;
    color : white;
`;

export const InputBox = styled.input`
    width: 400px;
    height: 45px;
    border-radius: 10px;
    background-color: white;
    padding: 10px;
    align-items: flex-start;
    font-size: 15px;
    box-sizing: border-box;
    margin-bottom: 20px;
    border: none;
    margin: 0;
`;

export const SubmitButton = styled.button`
    width: 400px;
    height: 45px;
    padding: 10px;
    font-size: 15px;
    border-radius: 8px;
    text-align: center;
    border: none;
    background-color: ${({ isDisabled }) => (isDisabled ? "#ccc" : "#f53344")}; 
    color: white;
    font-weight: bold;
    cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")}; 

    &:hover {
        background-color: ${({ isDisabled }) => (isDisabled ? "#ccc" : "#e02434")};
    }
`;
