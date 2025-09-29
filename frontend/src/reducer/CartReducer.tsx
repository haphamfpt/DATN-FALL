const cartReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LIST_CART":
      return {
        ...state,
        products: action.payload,
      };
    case "ADD_PRODUCT_TO_CART":
      const productIndex = state.products.findIndex(
        (item: any) => item.productId._id === action.payload.productId._id
      );

      if (productIndex >= 0) {
        const updatedProducts = [...state.products];
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          quantity:
            updatedProducts[productIndex].quantity + action.payload.quantity,
        };
        return { ...state, products: updatedProducts };
      } else {
        const newProducts = [...state.products, action.payload];
        return { ...state, products: newProducts };
      }
    case "UPDATE_COUNT_PRODUCT_INCREASE":
      return {
        ...state,
        products: state.products.map((pro: any) =>
          pro.productId._id == action.payload
            ? { ...pro, quantity: Math.max(pro.quantity + 1) }
            : pro
        ),
      };
    case "UPDATE_COUNT_PRODUCT_DECREASE":
      return {
        ...state,
        products: state.products.map((pro: any) =>
          pro.productId._id == action.payload
            ? { ...pro, quantity: Math.max(pro.quantity - 1, 1) }
            : pro
        ),
      };
    case "DELETE_PRODUCT_CART":
      return {
        ...state,
        products: state.products.filter(
          (item: any) => item.productId._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
