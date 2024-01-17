import {Routes} from "@angular/router";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {cartResolver} from "../../resolvers/cart.resolver";
import {getCartIdResolver} from "../../resolvers/get-cart-id.resolver";
import {offerPageGuard} from "./guards/offer-page.guard";
import {adminPagesGuard} from "./guards/admin-pages.guard";


export const sharedRoutes: Routes = [
  {path: '', component: NavigationComponent, pathMatch: 'prefix', resolve: {cartInfo: getCartIdResolver},  children: [
      {path: '', pathMatch: 'full', redirectTo: 'products'},
      {path: 'products', loadChildren: () => import('../products/products.routes').then(mod => mod.productsRoutes)},
      {path: 'clients', loadChildren: () => import('../clients/clients.routes').then(mod => mod.clientsRoutes)},
      {path: 'cities', loadChildren: () => import('../cities/cities.routes').then(mod => mod.citiesRoutes)},
      {path: 'brands', loadChildren: () => import('../brands/brands.routes').then(mod => mod.brandsRoutes)},
      {path: 'protocols', loadChildren: () => import('../protocols/protocols.routes').then(mod => mod.protocolsRoutes)},
      {path: 'orders', loadChildren: () => import('../orders/orders.routes').then(mod => mod.ordersRoutes), canActivate:[adminPagesGuard]},
      {path: 'banners', loadChildren: () => import('../banners/banners.routes').then(mod => mod.bannersRoutes)},
      {path: 'seminars', loadChildren: () => import('../seminars/seminars.routes').then(mod => mod.seminarsRoutes)},
      {path: 'profile', loadChildren: () => import('../profile/profile.routes').then(mod => mod.profileRoutes)},
      {path: 'promocode', loadChildren: () => import('../promocode/promocode.routes').then(mod => mod.promocodeRoutes), canActivate:[adminPagesGuard]},
      {path: 'users', loadChildren: () => import('../users/users.routes').then(mod => mod.usersRoutes), canActivate:[adminPagesGuard]},
      {path: 'cart', loadChildren: () => import('../cart/cart.routes').then(mod => mod.cartRoutes), resolve: {cartData: cartResolver}},
      {path: 'offer', loadChildren: () => import('../offer/offer.routes').then(mod => mod.offerRoutes), canActivate: [offerPageGuard]},
    ]},
];
