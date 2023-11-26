import React, {createContext, useCallback, useContext, useEffect, useReducer} from "react";
import axios from "axios";
import cartReducer from "../Reducers/cartReducer";
import {useProductContext} from "./ProductContext";
import { useCookies } from "react-cookie";

const CartContext = createContext();



const CartProvider = ({children}) => {

  const [cookie, setCookie] = useCookies(["cart"]);


  const getCartData = useCallback(()=>{
    let newCart=cookie.cart
  
    if (newCart == [] || newCart == null || newCart == undefined) {
      return [];
    } else {
      return newCart;
    }
  },[])
    // let newCart = JSON.parse(localStorage.getItem("_Cart"));
  

  
  const initialState = {
    cart: getCartData(),
    total_item: "",
    total_price: "",
  };
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

  const addDBCartData=()=>{

    dispatch({type:"ADD_DB_DATA",payload:getCartData()})
  }

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
    // localStorage.setItem("_Cart", JSON.stringify(state.cart));
    setCookie("cart",state.cart)
  },[state.cart]);

  return (
    <CartContext.Provider
      value={{...state, addToCart, removeItem, incrementItem, decrementItem,clearCart,addDBCartData,getCartData}}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export {CartContext, CartProvider, useCartContext};
