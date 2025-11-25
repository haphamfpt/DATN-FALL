export interface CartItem {
  productId: string;
  variantId?: string | null;
  name: string;
  price: number;
  image: string;
  color?: string;
  size?: string;
  quantity: number;
  stock: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (productId: string, variantId?: string | null) => void;
  updateQuantity: (productId: string, variantId: string | null, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}