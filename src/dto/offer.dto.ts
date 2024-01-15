import {ProductsDto} from "./products.dto";

export interface SendOfferDto {
  promocode?: string;
  payment_method: string;
  delivery_method: string;
  delivery_warehouse: string;
  additional_info?: string;
  delivery_address?: string;
  payment_info?: string;
}

export interface AcceptOfferDto extends Required<Omit<SendOfferDto, 'delivery_warehouse'>>{
  discount: string;
  discount_percentage: number;
  id: string;
  is_active: boolean;
  is_cancelled: boolean;
  items: ProductsDto[];
  total: string;
  total_with_discount: string;
  user: string;
  created_at?: string;
}
