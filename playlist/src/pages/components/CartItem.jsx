import React from "react";
import { useDispatch } from "react-redux";
import { increase, decrease, calculateTotals } from "../../redux/cartSlice"; // calculateTotals 추가
import * as S from "../../style/Cart.style";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { id, img, title, singer, price, amount } = item;

  const handleIncrease = () => {
    dispatch(increase(id)); // 수량 증가
    dispatch(calculateTotals()); // 총합 계산
  };

  const handleDecrease = () => {
    dispatch(decrease(id)); // 수량 감소
    dispatch(calculateTotals()); // 총합 계산
  };

  return (
    <S.Item>
      <S.ItemInfo>
        <S.AlbumArt src={img} alt={title} />
        <S.AlbumDetails>
          <h4>{title}</h4>
          <p>{singer}</p>
        </S.AlbumDetails>
      </S.ItemInfo>
      <S.Price>₩ {Number(price).toLocaleString()}</S.Price>
      <S.QuantityControl>
        <button onClick={handleIncrease}>▲</button>
        <span>{amount}</span>
        <button onClick={handleDecrease}>▼</button>
      </S.QuantityControl>
    </S.Item>
  );
};

export default CartItem;
