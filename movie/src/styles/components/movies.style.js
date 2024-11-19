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

