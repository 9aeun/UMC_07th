import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa"; 
import { openModal } from "../../redux/modalSlice";
import * as S from "../../style/Cart.style";

const CartHeader = () => {
  const dispatch = useDispatch();
  const { totalQuantity, totalAmount } = useSelector((state) => state.cart);

  return (
    <S.Header>
      <S.Title>UMC PlayList</S.Title>
      <S.CartSummary>
        <FaShoppingCart />
        <div>
          <p>수량: {totalQuantity}</p>
          <p>₩ {Number(totalAmount).toLocaleString()}</p>
        </div>
        <button onClick={() => dispatch(openModal())}>장바구니 비우기</button>
      </S.CartSummary>
    </S.Header>
  );
};

export default CartHeader;
