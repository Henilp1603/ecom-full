const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let {
        id,
        sigleProduct,
        selectedColor,
        selectedImg,
        selectedPrice,
        selectedSize,
      } = action.payload;

      let extistingProduct = state.cart.find(
        (curProduct) => curProduct.id === id
      );

      if (extistingProduct) {
        const updatedProduct = state.cart.map((curItem) => {
          if (curItem.id === id) {
            let newQ = 1;
            if (
              curItem.price == selectedPrice &&
              curItem.size == selectedSize &&
              curItem.image[0] == selectedImg[0]
            ) {
              newQ = curItem.quantity + 1;
            } else {
              newQ = 1;
            }

            return {
              ...curItem,
              quantity: newQ,
              price: selectedPrice,
              color: selectedColor,
              size: selectedSize,
              image: selectedImg,
            };
          } else {
            return curItem;
          }
        });
        return {
          ...state,
          cart: updatedProduct,
        };
      } else {
        let cartProduct;

        cartProduct = {
          id,
          title: sigleProduct.title,
          image: selectedImg,
          quantity: sigleProduct.quantity,
          price: selectedPrice,
          color: selectedColor,
          size: selectedSize,
        };

        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      }
    case "REMOVE_ITEM":
      return {
        cart: state.cart.filter((product) => {
          return product.id !== action.payload.id;
        }),
      };
    case "INCREMENT_ITEM":
      let updatedCart = state.cart.map((product) => {
        if (product.id === action.payload.id) {
          return {...product, quantity: product.quantity + 1};
        }
        return product;
      });
      return {...state, cart: updatedCart};

    case "DECREMENT_ITEM":
      let updatedCartt = state.cart
        .map((product) => {
          if (product.id === action.payload.id) {
            return {...product, quantity: product.quantity - 1};
          }
          return product;
        })
        .filter((product) => product.quantity !== 0);
      return {...state, cart: updatedCartt};

    case "GET_TOTAL":
      let {total_item, total_price} = state.cart.reduce(
        (accum, curval) => {
          let {quantity, price} = curval;
          let updatedPrice = price * quantity;
          accum.total_item += quantity;

          accum.total_price += updatedPrice;

          return accum;
        },
        {
          total_item: 0,
          total_price: 0,
        }
      );
      return {...state, total_item, total_price};
    case "DELETE_CART":
      return {
        ...state,
        cart:[],
        total_item:"",
        total_price:""
      }  

    default:
      return state;
  }
};

export default cartReducer;
