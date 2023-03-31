export type Product = {
  id: string;
  barcode: string;
  name: string;
  image: string;
  size_type: string;
  size: string;
  manufacturer: string;
  brand: string;
  description: string;
  price: string;
  care_type: string[];
};

export type CartItem = {
  id: string;
  product: Product;
  count: number;
};

export interface CartContextType {
  cart: CartItem[];
  addItemToCart: (product: Product, count: number) => void;
  removeItemFromCart: (productId: string) => void;
  clearCart: () => void;
}

export interface SelectOption {
  value: string;
  label: string;
}