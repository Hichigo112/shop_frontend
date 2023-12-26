export type Brand = {
  brand: string;
}

export type Name = {
  name: string;
}

export type Price = {
  price: string;
}

export type Volume = {
  volume: string;
}

export type Search = {
  search: string;
}

export type AllSearchDto = Brand | Name | Price | Volume | Search

export interface SearchDto {
  placeHolder: string;
  nameFilter: 'brand' | 'search' | 'price' | 'name' | 'volume';
  inputQueryParams: AllSearchDto;
}
