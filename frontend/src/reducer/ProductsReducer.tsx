import { IProduct } from "../interfaces/IProduct";

const ProductsReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LIST":
      return action.payload;
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      return state.map((item: IProduct) => {
        if (item._id !== action.payload._id) {
          return item;
        }
        return action.payload;
      });
    case "DELETE":
      return state.filter((item: IProduct) => {
          return item._id !== action.payload
      });
    default:
      break;
  }
};

export default ProductsReducer;
