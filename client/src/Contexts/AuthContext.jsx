import React, {createContext, useContext, useEffect, useReducer} from "react";
import axios from "axios";
import authReducer from "../Reducers/authReducer";

const AuthContext = createContext();

const initialState = {
  name: "",
  email: "",
  phoneNo:"",
  password: "",
  
};
const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const changeData = (e) => {
    const {value, name} = e.target;

    return dispatch({type: "CHANGE_DATA", payload: {name, value}});
  };

 

  

  return (
    <AuthContext.Provider value={{...state, changeData,}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export {AuthContext, AuthProvider, useAuthContext};
