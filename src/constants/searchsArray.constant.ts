import {SearchDto} from "../dto/search.dto";

export const searchArray: SearchDto[] = [
  {
    placeHolder:"Поиск ...",
    nameFilter:"search",
    inputQueryParams: {search: ''},
  },
  {
    placeHolder:"Цена ...",
    nameFilter:"price",
    inputQueryParams: {price: ''},
  },
  {
    placeHolder:"Бренд ...",
    nameFilter:"brand",
    inputQueryParams: {brand: ''},
  },
  {
    placeHolder:"Количество ...",
    nameFilter:"volume",
    inputQueryParams: {volume: ''},
  },
  {
    placeHolder:"Имя ...",
    nameFilter:"name",
    inputQueryParams: {name: ''},
  },
]
