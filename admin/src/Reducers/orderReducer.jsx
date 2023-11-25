const orderReducer = (state, action) => {
  switch (action.type) {
    case "SET_API_DATA":
      return {
        ...state,
        orders: action.payload,
      };

    case "SET_SINGLE_ORDER":
      return {
        ...state,
        sigleorder: action.payload,
      };

    case "SET_USER_ORDER":
      return {
        ...state,
        userOrder: action.payload,
      };

    case "REMOVE_ITEM":
      return {
        orders: state.orders.filter((pro) => {
          return pro.id !== action.payload;
        }),
      };
    case "SET_TOTAL_SALES":
      let {totalSales, totalOrder} = state.orders.reduce(
        (accum, curval) => {
          accum.totalOrder = accum.totalOrder + 1;
          accum.totalSales = accum.totalSales + curval.totalPrice;

          return accum;
        },
        {
          totalSales: 0,
          totalOrder: 0,
        }
      );
      return {
        ...state,
        totalSales,
        totalOrder,
      };

    default:
      return state;
  }
};

export default orderReducer;
