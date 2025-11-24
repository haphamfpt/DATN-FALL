import { Color } from "./color.types";
import { Size } from "./size.types";

export interface Variant {
  _id: string;
  product: string;
  color: Color | string;
  size: Size | string;
  listed_price: number;
  sale_price: number;
  import_price: number;
  stock: number;
  sku: string;
  is_show: boolean;
  createdAt?: string;
  updatedAt?: string;
}