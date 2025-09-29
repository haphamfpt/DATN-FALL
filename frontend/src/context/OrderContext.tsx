import { createContext, ReactNode, useEffect, useReducer } from "react";
import { IOrder } from "../interfaces/IOrder";
import OrderReducer from "../reducer/OrderReducer";
import instance from "../instance/instance";

interface Prop{
    children:ReactNode
}

export const OrderContext = createContext({} as {
    orders:IOrder[],
    dispatch:any
})

const OrdersProvider=(prop:Prop)=>{
    const [orders,dispatch]= useReducer(OrderReducer,[] as IOrder[] )
    useEffect(() => {
      (async () => {
        try {
            const {data}=await instance.get('order')
            dispatch({
                type:"LIST",
                payload:data.data
            })
        } catch (error) {
            console.log(error);
        }
      })()
    }, [])

    return (
        <OrderContext.Provider value={{orders,dispatch}}>
            {prop.children}
        </OrderContext.Provider>
    )
}

export default OrdersProvider