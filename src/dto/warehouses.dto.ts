import {CityDto} from "./city.dto";

export interface WarehousesDto {
  id: string;
  name: string;
  address: string;
  city: CityDto;
}
