import { ICategory } from "./ICategory";

export interface IProduct{
    _id?:string,
    name:string,
    slug:string,
    price:number,
    price_discount:number,
    images:string[],
    status:boolean,
    categoryId:ICategory
}
