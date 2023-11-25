import {createContext, useCallback, useContext, useEffect, useMemo, useReducer} from "react";
import axios from "axios";
import userReducer from "../Reducers/userReducer";
import { toast } from "react-toastify";

const initialState = {
  users: [],
  sigleuser: {},
  totalUser:0
};

const API = `${import.meta.env.VITE_SERVER_API}/api/user/all-users`;

const UserContext = createContext(initialState);

const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const getUsers = useCallback(async (url) => {
    const res = await axios.get(url);
    const users = await res.data;
    dispatch({type: "SET_API_DATA", payload: users});
  },[state.users])

  const getSingleUser = async (url) => {
    const res = await axios.get(url);
    const singleUser = await res.data;
    dispatch({type: "SET_SINGLE_USER", payload: singleUser});
  };

  const removeUser=useCallback(async(id)=>{
    const url=`${import.meta.env.VITE_SERVER_API}/api/user/user-delete/${id}`
    const res=await axios.delete(url)
    if (res) {
      toast.success("User Deleted.")
      getUsers(API)
    }
    
   
  },[state.users])



  useEffect(() => {
    getUsers(API);
  },[]);

  useEffect(()=>{
    dispatch({type:"SET_TOTAL_USER"})
  },[state.users])

  return (
    <UserContext.Provider value={{...state, getSingleUser,getUsers,removeUser}}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export {UserProvider, UserContext, useUserContext};
