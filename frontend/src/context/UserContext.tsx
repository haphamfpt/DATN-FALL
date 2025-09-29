import { ReactNode, createContext, useReducer } from "react"
import { IUser } from "../interfaces/IUser"
import userReducer from "../reducer/userReducer"

interface Prop{
    children:ReactNode
}
export const UserContext = createContext({} as {
    users:IUser[]
    dispatch:any
})

const UserProvider=(prop:Prop)=>{
    const [users,dispatch]=useReducer(userReducer,[] as IUser[])
    return (
        <UserContext.Provider value={{users,dispatch}}>
            {prop.children}
        </UserContext.Provider>
    )
}

export default UserProvider