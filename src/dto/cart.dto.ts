import {ProductsDto} from "./products.dto";

export interface CartItem {
  id: string;
  product: ProductsDto;
  quantity: number;
  cart: string;
}

export interface CartDto {
  id: string;
  items: CartItem[];
  user: string;
}

export interface AddProduct {

  product: string;
  quantity: number;
  cart: string;
}

export interface ResAddProduct extends AddProduct{
  id: string;
}
