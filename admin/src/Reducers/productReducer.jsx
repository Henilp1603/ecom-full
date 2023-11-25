const productReducer = (state, action) => {
    switch (action.type) {

      case "SET_API_DATA":
        
        return {
          ...state,
          products: action.payload,
          addedProduct:action.payload
        };
  
      case "SET_SINGLE_PRODUCT":
        return {
          ...state,
          sigleProduct: action.payload,
        };

      case "REMOVE_ITEM": 
          return {
            products:state.products.filter((pro)=>{
              return pro.id !== action.payload
            })
          };
       case "SET_TOTAL_PRODUCT":
        let {totalProduct} = state.products.reduce(
          (accum, curval) => {
            accum.totalProduct = accum.totalProduct + 1;
            
  
            return accum;
          },
          {
            totalProduct: 0,
            
          }
        );
        return {
          ...state,
          totalProduct
        };   
  
      default:
        return state;
    }
  };
  
  export default productReducer;
  