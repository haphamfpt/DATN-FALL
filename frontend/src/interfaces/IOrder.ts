
import { IProduct } from "./IProduct";

export interface IOrder {
  _id?: string;
  name_shopping: string;
  address_shopping: string;
  code_Order: string;
  phone_shopping: string;
  productItem: [
    {
      productId: IProduct;
      quatity: number;
      _id: string;
    }
  ];
  subtotalPrice: number;
  status: "pending" | string,
  createdAt: string;
}

