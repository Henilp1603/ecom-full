const adminReducer = (state, action) => {
    switch (action.type) {

      case "SET_API_DATA":
        
        return {
          ...state,
          companyData:action.payload
        };
  
      
       
  
      default:
        return state;
    }
  };
  
  export default adminReducer;
  