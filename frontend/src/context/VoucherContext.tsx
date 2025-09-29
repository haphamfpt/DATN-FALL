import { ReactNode, createContext, useEffect, useReducer } from "react";
import { IVoucher } from "../interfaces/IVoucher";
import voucherReducer from "../reducer/voucherReducer";
import instance from "../instance/instance";

interface Prop {
  children: ReactNode;
}
export const VoucherContext = createContext(
  {} as {
    vouchers: IVoucher[];
    dispatch: any;
  }
);

const VoucherProvider = (props: Prop) => {
  const [vouchers, dispatch] = useReducer(voucherReducer, [] as IVoucher[]);
  useEffect(() => {
    (async() => {
      const {data}=await instance.get('vouchers')
      dispatch({
        type:"LIST",
        payload:data.data
      })
    })()
  }, [])
  return (
    <VoucherContext.Provider value={{ vouchers, dispatch }}>
      {props.children}
    </VoucherContext.Provider>
  );
};

export default VoucherProvider;
