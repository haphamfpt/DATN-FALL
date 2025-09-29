export interface IUser{
    _id?:string,
    username:string,
    email:string,
    name:string,
    address:string,
    status:boolean,
    avatar:string,
    password: string;
    confirmPass: string;
    role?: "member" | "admin"
}
