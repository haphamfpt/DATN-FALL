import { IOrder } from "../interfaces/IOrder"



const OrderReducer = (state:any,action:any) => {
  switch (action.type) {
    case "LIST":
        return action.payload
    case "UPDATE":

        return state.map((item:IOrder)=>{
          if (item._id !==action.payload._id) {
            return item
          }
          return action.payload
        })
    default:
        return state
  }
}

export default OrderReducer