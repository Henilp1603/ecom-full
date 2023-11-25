import {createContext, useContext, useEffect, useReducer} from "react";
import axios from "axios";
import productReducer from "../Reducers/productReducer";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  sigleProduct: {},
  addedProduct:[],
  totalProduct:0
};

const API = `${import.meta.env.VITE_SERVER_API}/api/product/all-product`;

const ProductContext = createContext(initialState);

const ProductProvider = ({children}) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const getProducts = async (url) => {
    const res = await axios.get(url);
    const products = await res.data;
    dispatch({type: "SET_API_DATA", payload: products});
  };

  const getSingleProduct = async (url) => {
    const res = await axios.get(url);
    const singleProducts = await res.data;
    dispatch({type: "SET_SINGLE_PRODUCT", payload: singleProducts});
  };

  const removeProduct=async(id)=>{
    
    const url=`${import.meta.env.VITE_SERVER_API}/api/product/delete-product/${id}`
    const res=await axios.delete(url)
    if (res) {
      toast.success("Product Deleted.")
      getProducts(API)
    }
    
  }

  useEffect(() => {
    getProducts(API);
  },[]);

  useEffect(()=>{
    dispatch({type:"SET_TOTAL_PRODUCT"})
  },[state.products])

  return (
    <ProductContext.Provider value={{...state, getSingleProduct,getProducts,removeProduct}}>
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(ProductContext);
};

export {ProductProvider, ProductContext, useProductContext};
