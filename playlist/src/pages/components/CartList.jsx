import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import * as S from "../../style/Cart.style";

const CartList = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <S.Playlist>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </S.Playlist>
  );
};

export default CartList;