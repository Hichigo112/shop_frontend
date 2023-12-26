import {BrandDto} from "../dto/brand.dto";

export const defaultBrands: Pick<BrandDto, 'id' | 'name'>[] = [
  {
    id: '96e62979-0832-4bc3-a8d0-7062521b900d',
    name: 'Apple'
  },
  {
    id: '13929769-910c-42e3-a92f-295015fa476c',
    name: 'Huawei'
  },
  {
    id: 'ba76ef05-cbf2-4d24-a73a-cea79584a802',
    name: 'Samsung'
  },
  {
    id: '74c5816e-42db-495e-b5eb-f2571ec82c66',
    name: 'Xiaomi'
  },
]
