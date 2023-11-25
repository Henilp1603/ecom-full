const authReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_DATA":
      const {name, value} = action.payload;
      return {
        ...state,
        [name]: value,
      };
    

    default:
      return state;
  }
};

export default authReducer;
