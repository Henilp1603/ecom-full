import {createContext, useContext, useEffect, useReducer} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import categoryReducer from "../Reducers/categoryReducer";

const initialState = {
  category: [],
};


const CategoryContext = createContext(initialState);

const CategoryProvider = ({children}) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  const getCategory = async () => {
    const url = `${import.meta.env.VITE_SERVER_API}/api/category/all-category`;

    const res = await axios.get(url);
    const category = await res.data;
    dispatch({type: "SET_API_DATA", payload: category});
  };

  

  const removeCategory=async(id)=>{
    
    const url=`${import.meta.env.VITE_SERVER_API}/api/category/delete-category/${id}`
    const res=await axios.delete(url)
    if (res) {
      toast.success("Category Deleted.")
      getCategory()
    }
    // dispatch({type:"REMOVE_ITEM",payload:id})
  }

  useEffect(() => {
    getCategory()
  },[]);

  

  return (
    <CategoryContext.Provider value={{...state,getCategory,removeCategory}}>
      {children}
    </CategoryContext.Provider>
  );
};

const useCategoryContext = () => {
  return useContext(CategoryContext);
};

export {CategoryProvider, CategoryContext, useCategoryContext};
