const userReducer = (state, action) => {
    switch (action.type) {

      case "SET_API_DATA":
        
        return {
          ...state,
          users: action.payload,
        
        };
  
      case "SET_SINGLE_USER":
        return {
          ...state,
          sigleUser: action.payload,
        };

      case "REMOVE_ITEM": 
          return {
            users:state.users.filter((pro)=>{
              return pro.id !== action.payload
            })
          };
       case "SET_TOTAL_USER":
        let {totalUser} = state.users.reduce(
          (accum, curval) => {
            accum.totalUser = accum.totalUser + 1;
            
  
            return accum;
          },
          {
            totalUser: 0,
            
          }
        );
        return {
          ...state,
          totalUser
        };     
  
      default:
        return state;
    }
  };
  
  export default userReducer;
  