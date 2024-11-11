import styled from "styled-components";

export const SearchPageContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    color: white;
    padding: 20px;
    position: relative;
    align-items: center;
`;

export const SearchContainer = styled.div`
    width: 100%;
    height: 70px;
    position: absolute;
    right: 10px;
    margin-top: 30px;
    margin-bottom: 50px;
    padding: 10px;
    box-sizing: border-box;
    flex-direction: row;
`

export const InputBox = styled.input`
    width: 90%;
    padding: 10px 15px;
    height: 40px;
    box-sizing: border-box;
    border: none;
    border-radius: 5px 0 0 5px;
    outline: none;
    font-size: 16px;
    color: #333;
    background-color: #fff; // 입력창 배경색
    &::placeholder {
        color: #aaaaaa; // placeholder 텍스트 색상
    }
`;

export const SearchButton = styled.button`
    height: 40px;
    box-sizing: border-box;
    padding: 10px 20px;
    font-size: 16px;
    color: #ffffff;
    background-color: #f53344; // 검색 버튼 색상
    border: none;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #f40612; // 호버 시 색상 변화
    }
`;