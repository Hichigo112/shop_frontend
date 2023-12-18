import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: 'auth', loadChildren: () => import('../modules/auth/auth.routes').then(mod => mod.authRoutes)},
  {path: 'products', loadChildren: () => import('../modules/products/products.routes').then(mod => mod.productsRoutes)},
  {path: 'clients', loadChildren: () => import('../modules/clients/clients.routes').then(mod => mod.clientsRoutes)},
  {path: 'cities', loadChildren: () => import('../modules/cities/cities.routes').then(mod => mod.citiesRoutes)},
  {path: 'brands', loadChildren: () => import('../modules/brands/brands.routes').then(mod => mod.brandsRoutes)},
  {path: 'protocols', loadChildren: () => import('../modules/protocols/protocols.routes').then(mod => mod.protocolsRoutes)},
  {path: 'orders', loadChildren: () => import('../modules/orders/orders.routes').then(mod => mod.ordersRoutes)},
  {path: 'banners', loadChildren: () => import('../modules/banners/banners.routes').then(mod => mod.bannersRoutes)},
  {path: 'seminars', loadChildren: () => import('../modules/seminars/seminars.routes').then(mod => mod.seminarsRoutes)},
  {path: 'promocode', loadChildren: () => import('../modules/promocode/promocode.routes').then(mod => mod.promocodeRoutes)},
  {path: '**', loadChildren: () => import('../modules/shared/shared.routes').then(mod => mod.sharedRoutes)},
];
