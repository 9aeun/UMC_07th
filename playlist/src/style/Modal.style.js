import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  p {
    font-size: 16px;
    margin-bottom: 20px;
  }

  div {
    display: flex;
    justify-content: space-around;

    button {
      background: #6242fc;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background: #502bb3;
      }

      &:nth-child(2) {
        background: #ccc;
        &:hover {
          background: #999;
        }
      }
    }
  }
`;
