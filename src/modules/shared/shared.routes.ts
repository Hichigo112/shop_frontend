import {Routes} from "@angular/router";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {cartResolver} from "../../resolvers/cart.resolver";
import {getCartIdResolver} from "../../resolvers/get-cart-id.resolver";


export const sharedRoutes: Routes = [
  {path: '', component: NavigationComponent, pathMatch: 'prefix', resolve: {cartInfo: getCartIdResolver},  children: [
      {path: '', pathMatch: 'full', redirectTo: 'products'},
      {path: 'products', loadChildren: () => import('../products/products.routes').then(mod => mod.productsRoutes)},
      {path: 'clients', loadChildren: () => import('../clients/clients.routes').then(mod => mod.clientsRoutes)},
      {path: 'cities', loadChildren: () => import('../cities/cities.routes').then(mod => mod.citiesRoutes)},
      {path: 'brands', loadChildren: () => import('../brands/brands.routes').then(mod => mod.brandsRoutes)},
      {path: 'protocols', loadChildren: () => import('../protocols/protocols.routes').then(mod => mod.protocolsRoutes)},
      {path: 'orders', loadChildren: () => import('../orders/orders.routes').then(mod => mod.ordersRoutes)},
      {path: 'banners', loadChildren: () => import('../banners/banners.routes').then(mod => mod.bannersRoutes)},
      {path: 'seminars', loadChildren: () => import('../seminars/seminars.routes').then(mod => mod.seminarsRoutes)},
      {path: 'promocode', loadChildren: () => import('../promocode/promocode.routes').then(mod => mod.promocodeRoutes)},
      {path: 'cart', loadChildren: () => import('../cart/cart.routes').then(mod => mod.cartRoutes), resolve: {cartData: cartResolver}},
    ]},
];
