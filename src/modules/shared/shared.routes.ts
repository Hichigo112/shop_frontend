import {Routes} from "@angular/router";
import {NotFoundComponent} from "./components/not-found/not-found.component";


export const sharedRoutes: Routes = [
  {path: '', component: NotFoundComponent},
];
