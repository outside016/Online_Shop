import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/UI/footer/footer.component';
import { HeaderComponent } from './components/UI/header/header.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemsDetailsComponent } from './components/items-details/items-details.component';
import { BasketComponent } from './components/basket/basket.component';
import { MainComponent } from './components/main/main.component';
import { DialogBoxComponent } from './components/UI/dialog-box/dialog-box.component';
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ItemsComponent,
    ItemsDetailsComponent,
    BasketComponent,
    MainComponent,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
