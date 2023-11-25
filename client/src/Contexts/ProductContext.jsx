import React, {createContext, useContext, useEffect, useReducer} from "react";
import productReducer from "../Reducers/productReducer";
import axios from "axios";

const ProductContext = createContext();

const initialState = {
  products: [],
  singleProducts: [],
};

const API = `${import.meta.env.VITE_SERVER_API}/api/product/all-product`;

const ProductProvider = ({children}) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const getProducts = async (url) => {
    const res = await axios.get(url);
    const products = await res.data;
    dispatch({type: "SET_API_DATA", payload: products});
  };

  const getSingleProduct = async (url) => {
    const {data: res} = await axios.get(url);
    const singleProducts = await res;
    dispatch({
      type: "SET_SINGLE_PRODUCT",
      payload: {singleProducts: singleProducts},
    });
    return singleProducts;
  };

  const handelSizeSelect = (value) => {
    dispatch({type: "SET_SIZE", payload: value});
  };

  const handelColorSelect = (value) => {
    dispatch({type: "SET_COLOR", payload: value});
  };

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <ProductContext.Provider
      value={{...state, getSingleProduct, handelSizeSelect, handelColorSelect}}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(ProductContext);
};

export {ProductContext, ProductProvider, useProductContext};
