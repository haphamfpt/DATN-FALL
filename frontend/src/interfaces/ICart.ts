import { IProduct } from "./IProduct";
export interface ICart {
  _id?: string;
  userId: string;
  products: [
    {
      productId: IProduct;
      quantity: number;
      _id: string;
    }
  ];
  status?: boolean;
}
