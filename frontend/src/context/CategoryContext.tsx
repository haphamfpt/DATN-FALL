import { ReactNode, createContext, useEffect, useReducer } from "react";
import { ICategory } from "../interfaces/ICategory";
import CategorysReducer from "../reducer/CategorysReducer";
import instance from "../instance/instance";
import { toast } from "react-toastify";

interface Props {
  children: ReactNode;
}

export const CategorysContext = createContext(
  {} as {
    categorys: ICategory[];
    dispatch: any;
  }
);

const CategorysProvider = (props: Props) => {
  const [categorys, dispatch] = useReducer(CategorysReducer, [] as ICategory[]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get("categorys");
        dispatch({
          type: "LIST",
          payload: data.data,
        });
      } catch (error: any) {
        toast.error(`Lỗi ${error.response.data.message}`);
      }
    })();
  }, []);
  return (
    <CategorysContext.Provider value={{ categorys, dispatch }}>
      {props.children}
    </CategorysContext.Provider>
  );
};

export default CategorysProvider;
