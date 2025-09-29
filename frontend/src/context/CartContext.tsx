import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import cartReducer from "../reducer/CartReducer";
import instance from "../instance/instance";

interface ICartContext {
  cart: any;
  dispatch: Dispatch<any>;
}

const CartContext = createContext<ICartContext | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { products: [] });
  useEffect(() => {
    (async () => {
      if (localStorage.getItem("user")) {
        const { data } = await instance.get(
          "cart/" + JSON.parse(localStorage.getItem("user") as string)?._id
        );
        dispatch({
          type: "LIST_CART",
          payload: data.data.products,
        });
      }
    })();
  }, []);
  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
