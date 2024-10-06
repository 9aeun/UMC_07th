import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Category = styled.h1`
    color : white;
    font-size : 30px;
    text-align : flex-start;
`

export const CategoryBox = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    grid-auto-rows: 100px;
    gap: 20px;
    justify-content: center;
`;

export const ImageLink = styled(NavLink)`
    position: relative;
    width: 200px;
    height: 100px;
    display: block;
    background-image: url(${props => props.bgImage});
    background-size: cover;
    background-position: center;
    border-radius: 10px;

    &:hover {
        opacity: 0.8;
    }
`;

export const Overlay = styled.div`
    position: absolute;
    bottom: 0;
    left: 5;
    width : auto;
    height: 15px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
`;