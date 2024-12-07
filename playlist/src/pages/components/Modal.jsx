import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modalSlice";
import { clearCart } from "../../redux/cartSlice";
import * as S from "../../style/Modal.style";

const Modal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);

  if (!isOpen) return null;

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <S.ModalOverlay>
      <S.ModalContainer>
        <p>정말로 장바구니를 비우시겠습니까?</p>
        <div>
          <button onClick={handleConfirm}>네</button>
          <button onClick={handleCancel}>아니요</button>
        </div>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default Modal;
