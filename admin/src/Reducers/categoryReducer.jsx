const categoryReducer = (state, action) => {
    switch (action.type) {
      case "SET_API_DATA":
        return {
          ...state,
          category: action.payload,
        };
  
      case "REMOVE_ITEM":
        return {
          orders: state.orders.filter((pro) => {
            return pro.id !== action.payload;
          }),
        };
      
  
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  