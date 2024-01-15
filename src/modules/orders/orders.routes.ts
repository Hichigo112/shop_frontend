import {Routes} from "@angular/router";
import {OrdersComponent} from "./components/orders/orders.component";
import {DetailOrderComponent} from "./components/detail-order/detail-order.component";


export const ordersRoutes: Routes = [
  {path: ':id', component: DetailOrderComponent},
  {path: '', component: OrdersComponent},
];
