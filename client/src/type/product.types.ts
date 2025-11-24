import { Category } from "./category.types";
import { Variant } from "./variant.types";

export interface ProductImage {
  url: string;
  alt?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  category: Category | string;
  brand?: string;
  description: string;
  short_description?: string;
  images: ProductImage[];
  price?: number;
  sale_price?: number;
  import_price?: number;
  rating?: number;
  numReviews?: number;
  total_sold?: number;
  countInStock?: number;
  is_active: boolean;
  is_featured?: boolean;
  tags?: string[];
  has_variants: boolean;
  variants?: Variant[];
  createdAt?: string;
  updatedAt?: string;
}