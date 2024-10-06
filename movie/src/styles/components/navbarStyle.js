import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const TopNavBar = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 40px;
    padding: 20px 10px;
    margin: 0;
    display: flex;
    background-color : #333333;
    
    > div { 
        display: flex; 
        margin-left: auto; /* 오른쪽 정렬 */
    }
`;

export const LoginButton = styled.button `
    width: 100px;
    height: 40px;
    padding: 10px;
    margin: 0 10px; 
    font-size: 15px;
    border-radius: 10px;
    text-align : center;
    border : none;
    background-color : #333333;
    color : white;

    &.account {
        background-color: #f53344; /* 회원가입 버튼의 배경색 */
    }

    &:hover {
        opacity: 0.8; /* 호버 시 투명도 변경 */
    }
`

export const SideBar = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 150px;
    height: 100vh;
    background-color: #333333;
    color: white;
    left : 0;
    z-index: 20;
    align-item : flex-start; 
    margin-right: auto;
    padding-left: 20px; 
    overflow-y: auto;
`

export const Title = styled(NavLink)`
    font-size: 30px;
    color: #f53344;
    margin-bottom : 20px;
    &:hover {
        opacity: 0.8;
        color: #f53344;
    }

    &.sub {
        font-size : 15px;
        color : white;
    }
`

export const Text = styled(Title)`
    font-size : 15px;
    color : white;
`
