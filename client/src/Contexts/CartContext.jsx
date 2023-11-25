import React, {createContext, useContext, useEffect, useReducer} from "react";
import axios from "axios";
import cartReducer from "../Reducers/cartReducer";
import {useProductContext} from "./ProductContext";

const CartContext = createContext();

const getCartData = () => {
  let newCart = JSON.parse(localStorage.getItem("_Cart"));

  if (newCart == [] || newCart == null || newCart == undefined) {
    return [];
  } else {
    return newCart;
  }
};

const initialState = {
  cart: getCartData(),
  total_item: "",
  total_price: "",
};

const CartProvider = ({children}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (
    id,
    sigleProduct,
    selectedColor,
    selectedImg,
    selectedPrice,
    selectedSize
  ) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id,
        sigleProduct,
        selectedColor,
        selectedImg,
        selectedPrice,
        selectedSize,
      },
    });
  };

  const clearCart = () => {
    dispatch({type: "DELETE_CART"});
  };
  const removeItem = (id) => {
    dispatch({type: "REMOVE_ITEM", payload: {id}});
  };
  const incrementItem = (id) => {
    dispatch({type: "INCREMENT_ITEM", payload: {id}});
  };
  const decrementItem = (id) => {
    dispatch({type: "DECREMENT_ITEM", payload: {id}});
  };

  useEffect(() => {
    dispatch({type: "GET_TOTAL"});
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem("_Cart", JSON.stringify(state.cart));
  });

  return (
    <CartContext.Provider
      value={{...state, addToCart, removeItem, incrementItem, decrementItem,clearCart}}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export {CartContext, CartProvider, useCartContext};
