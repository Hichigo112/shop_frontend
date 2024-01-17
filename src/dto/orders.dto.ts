import {ProductsDto} from "./products.dto";
import {WarehousesDto} from "./warehouses.dto";
import {AcceptOfferDto} from "./offer.dto";


export interface OrderDto {
  id: string;
  order_date: string;
  order_number: number;
  is_paid: boolean;
  is_viewed_by_admin: boolean;
  status: Status;
  offer: {
    items: OfferItem[]
    delivery_warehouse: WarehousesDto;
  } & Omit<AcceptOfferDto, 'items'>,
}

interface OfferItem {
  id: string;
  offer: string;
  product: Required<Omit<ProductsDto, 'brand'> & {brand: string;}>
  quantity: number;
  warehouse: WarehousesDto;
}

export interface ShortOrderDto {
  order_number: number;
  is_paid?: boolean;
  is_viewed_by_admin?: boolean;
  status?: Status;
  offer?: string;
}

enum Status {
  pending = 'pending',
  completed = 'completed',
  canceled = 'canceled',
  preparing = 'preparing',
  waiting = 'waiting'
}
