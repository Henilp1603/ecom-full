import {createContext, useContext, useEffect, useReducer} from "react";
import axios from "axios";

import { toast } from "react-toastify";
import adminReducer from "../Reducers/adminReducer";

const initialState = {
  companyData: "",
};



const AdminContext = createContext(initialState);

const AdminProvider = ({children}) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  const getCompanyData = async () => {
    const url=`${import.meta.env.VITE_SERVER_API}/api/company/all-company`
    const res = await axios.get(url);
    const data = await res.data;
    dispatch({type: "SET_API_DATA", payload: data});
  };

  

  

  useEffect(() => {
    getCompanyData();
  },[]);

 

  return (
    <AdminContext.Provider value={{...state,getCompanyData}}>
      {children}
    </AdminContext.Provider>
  );
};

const useAdminContext = () => {
  return useContext(AdminContext);
};

export {AdminProvider, AdminContext, useAdminContext};
