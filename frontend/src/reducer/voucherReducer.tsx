import { IVoucher } from "../interfaces/IVoucher";

const voucherReducer = (state:any,action:any) => {
  switch (action.type) {
    case "LIST":
        return action.payload
    case "ADD":
        return [action.payload,...state]
    case "UPDATE":
        return state.map((item:IVoucher)=>{
            if (item._id !==action.payload._id) {
                return item
            }
            return action.payload
        })
    case "DELETE":
        return state.filter((item:IVoucher)=>{
            return item._id !==action.payload
        })
  
    default:
        break;
  }
}

export default voucherReducer