import {BrandDto} from "./brand.dto";

export interface ProductsDto {
  id: string;
  name: string;
  name_from_1c: string;
  price: number;
  volume?: number;
  is_ready?: boolean;
  is_retail_allowed?: boolean;
  description: string;
  images?: [];
  brand: BrandDto;
}

export interface ProductsParams {
  name?: string;
  brand?: string;
  price?: string;
  volume?: string;
  search?: string;
  ordering?: string;
  page?: string;
}
