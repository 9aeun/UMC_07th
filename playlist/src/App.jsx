import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCartItems, calculateTotals } from "./redux/cartSlice";
import cartItems from "./constants/cartItem";
import CartHeader from "./pages/components/CartHeader";
import CartList from "./pages/components/CartList";
import CartFooter from "./pages/components/CartFooter";
import * as S from "./style/Cart.style";
import Modal from "./pages/components/\bModal";

const App = () => {
  const { totalAmount, totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCartItems(cartItems));
    dispatch(calculateTotals());
  }, [dispatch]);

  return (
    <S.Container>
      <CartHeader />
      <h2>당신이 선택한 음반</h2>
      <CartList />
      <CartFooter totalAmount={totalAmount} totalQuantity={totalQuantity} />
      <Modal />
    </S.Container>
  );
};

export default App;