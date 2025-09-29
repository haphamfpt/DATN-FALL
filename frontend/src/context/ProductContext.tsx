import { ReactNode, createContext, useEffect, useReducer } from "react";
import { IProduct } from "../interfaces/IProduct";
import ProductsReducer from "../reducer/ProductsReducer";
import instance from "../instance/instance";
import { toast } from "react-toastify";

interface Props {
  children: ReactNode;
}

export const ProductContext = createContext(
  {} as {
    products: IProduct[];
    dispatch: any;
  }
);

const ProductProvider = (props: Props) => {
  const [products, dispatch] = useReducer(ProductsReducer, [] as IProduct[]);
  //list data products
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get("products");
        dispatch({
          type: "LIST",
          payload: data.data,
        });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    })();
  }, []);
  return (
    <ProductContext.Provider value={{ products, dispatch }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
