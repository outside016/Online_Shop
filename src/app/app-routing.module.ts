import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./components/main/main.component";
import {ItemsComponent} from "./components/items/items.component";
import {ItemsDetailsComponent} from "./components/items-details/items-details.component";
import {BasketComponent} from "./components/basket/basket.component";
import {ItemsResolver} from "./services/items.resolver";

const routes:Routes = [
  {path:'',component: MainComponent},
  {path:'items', component: ItemsComponent},
  {path:'items/:id', component: ItemsDetailsComponent, resolve: {data: ItemsResolver}},
  {path:'basket', component: BasketComponent},

  {path:'**', component: MainComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
