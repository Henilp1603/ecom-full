import SingleProduct from "../pages/SingleProduct";

const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_API_DATA":
      return {
        ...state,
        products: action.payload,
      };

    case "SET_SINGLE_PRODUCT":
      const {singleProducts} = action.payload;

      return {
        ...state,
        singleProducts: {
          id: singleProducts._id,
          title: singleProducts.title,
          description: singleProducts.description,
          selectedPrice: {...singleProducts.discountedPrice[0]},
          allPrice: singleProducts.discountedPrice,
          totalRating: singleProducts.totalrating,
          MRP: singleProducts.MRP,
          category: singleProducts.category,
          allColors: singleProducts.colorsAndImg,
          selectedColor: {...singleProducts.colorsAndImg[0]},
          quantity: singleProducts.quantity,
          ratings:singleProducts.ratings
        },
      };

    case "SET_SIZE":
      return {
        ...state,
        singleProducts: {
          ...state.singleProducts,
          selectedPrice: action.payload,
        },
      };

    case "SET_COLOR":
      return {
        ...state,
        singleProducts: {
          ...state.singleProducts,
          selectedColor: action.payload,
        },
      };

    default:
      return state;
  }
};

export default productReducer;
