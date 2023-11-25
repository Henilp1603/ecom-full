import React, {createContext, useContext, useEffect, useReducer} from "react";
import axios from "axios";
import filterReducer from "../Reducers/filterReducer";
import {useProductContext} from "./ProductContext";
import { useNavigate } from "react-router-dom";

const FilterContext = createContext();

const FilterProvider = ({children}) => {
  const {products} = useProductContext();
  const initialState = {
    filter_products: [...products],
    filters: {
      category: "All",
    },
  };

 
  const [state, dispatch] = useReducer(filterReducer, initialState);

  useEffect(() => {
    dispatch({type: "LOAD_FILTER_PRODUCT", payload: products});
  }, [products]);

  useEffect(() => {
    dispatch({type: "FILTER_PRODUCT", payload: products});
  }, [products, state.filters]);

  const upadteFilterValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    

    return dispatch({type: "UPDATE_FILTER_VALUE", payload: {name, value}});
  };

  const hendleCtegory=(c)=>{
    let name='category'
    let value=c

    
    return dispatch({type: "UPDATE_FILTER_VALUE", payload: {name, value}});

  }

  return (
    <FilterContext.Provider value={{...state, upadteFilterValue,hendleCtegory}}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilterContext = () => {
  return useContext(FilterContext);
};

export {FilterContext, FilterProvider, useFilterContext};
