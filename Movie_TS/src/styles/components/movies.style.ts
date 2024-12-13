import styled from 'styled-components';

export const CardList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;
    justify-content: flex-start;
    min-height: 100vh; /* 최소 높이 설정 */
    height: auto;
    overflow-y: auto; /* 스크롤 가능하도록 설정 */
    position: relative; /* absolute 대신 relative로 변경 */
    background-color: black; /* 디버깅을 위해 변경 가능 */
`;

export const PageButton = styled.button`
    width: 60px;
    height: 35px;
    padding: 10px;
    color: white;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: #f53344;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #d32f2f; /* hover 시 밝은 색상 */
    }

    &:disabled {
        background-color: #333333; /* 비활성화 시 배경색 변경 */
        cursor: not-allowed;
    }
`;

export const Page = styled.p`
    font-size: 10px;
    color: white;
`;

