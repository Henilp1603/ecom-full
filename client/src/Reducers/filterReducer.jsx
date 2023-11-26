const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCT":
      return {
        ...state,
        filter_products: [...action.payload],
      };

    case "UPDATE_FILTER_VALUE":
      const {name, value} = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "FILTER_PRODUCT":
      const products = action.payload;
      const {category,text} = state.filters;

      let tempProduct = [...products];

      if (category.toLowerCase() !== "all") {
        tempProduct = tempProduct.filter((item) => {
          return item.category.includes(category);
        });
      }

      if (text) {
        tempProduct=tempProduct.filter((item)=>{
          return item.title.toLowerCase().includes(text.toLowerCase())
        })        
      }

      return {
        ...state,
        filter_products: tempProduct,
      };

    default:
      return state;
  }
};

export default filterReducer;
