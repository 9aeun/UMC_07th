import styled from 'styled-components'

export const Title = styled.h1`
    color: black;
    font-size: 40px;
    text-align: center;
    padding : 80px 10px 50px 10px;
    font-family: Arial;
`;

export const Line = styled.div`
    width : 80%;
    height : 2px;
    background-color : #e1e2e3;
    margin : 20px;
`;

export const SeparDiv = styled.div`
    width: 70%;
    display: flex;
    justify-content: space-between;  /* 두 개의 섹션을 가로로 정렬 */
    gap: 20px;
    font-family: Arial;
    margin: 0 auto;

    /* 각 섹션을 세로로 정렬 */
    > .section {
        display: flex;
        flex-direction: column;
        width: 48%; /* 두 섹션이 나란히 배치되도록 각 48% 너비로 설정 */
    }

    /* 섹션 내에서 h5 제목은 가운데 정렬 */
    > .section h5 {
        text-align: center;
        margin-bottom: 10px;
        font-size: 18px;
    }
`;

export const ListDiv = styled.div`
    padding: 10px;
    text-align: left;
    border-bottom: 3px solid #a0b7db;
    font-size: 18px;
    font-family: Arial;
    display: flex;
    justify-content: space-between;

    > button {
        margin-left: 10px;
        width : 50px;
        padding : 3px;
        margin : 0 5px;
        height : 30px;
        font-size : 10px;
        border-radius: 10px;
        border : none;
        
        &.compelte {
            background-color : #a0b7db;
        }
        
        &.delete {
            background-color : red;
        }
    }
`;


export const MenuBox = styled.p`
    background: rgb(240,240,240);
    padding: 10px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
`;

export const GreenButton = styled.button`
    display: block;
    background-color: rgb(3,102,53);
    padding: 10px;
    width: 150px;
    height: 40px;
    border-radius: 10px;
`;

export const StyledInput = styled.input`
    width: 70%;
    height: 30px;
    border: 2px solid #000000;
    padding : 10px;
    font-size: 18px;
`;

export const StyledDiv = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color : #f0f5fc;
`;
