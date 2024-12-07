import React from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import * as S from "../../style/Cart.style";

const CartFooter = ({ totalAmount, totalQuantity }) => {
  const dispatch = useDispatch();

  return (
    <S.Footer>
      <S.Total>
        <span>총 수량: {totalQuantity}</span>
        <span>총 금액: ₩ {Number(totalAmount).toLocaleString()}</span>
      </S.Total>
      <button onClick={() => dispatch(clearCart())}>장바구니 초기화</button>
    </S.Footer>
  );
};

export default CartFooter;