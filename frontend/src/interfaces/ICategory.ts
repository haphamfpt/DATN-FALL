import { IProduct } from "./IProduct";

export interface ICategory {
  _id?: string;
  name: string;
  slug: string;
  status: boolean;
  productId: [IProduct];
}
