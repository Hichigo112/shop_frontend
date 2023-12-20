import { Routes } from '@angular/router';
import {NotFoundComponent} from "../components/not-found/not-found.component";
import {authGuard} from "./guards/auth.guard";
import {notAuthGuard} from "./guards/not-auth.guard";

export const routes: Routes = [
  {path: 'auth', loadChildren: () => import('../modules/auth/auth.routes').then(mod => mod.authRoutes), canActivate: [notAuthGuard]},
  {path: '', loadChildren: () => import('../modules/shared/shared.routes').then(mod => mod.sharedRoutes), canActivate: [authGuard]},
  {path: '**', component: NotFoundComponent},
];
