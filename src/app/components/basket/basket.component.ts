import {Component, OnDestroy, OnInit} from '@angular/core';
import {Items} from "../../models/items";
import {Subscription} from "rxjs";
import {ItemsService} from "../../services/items.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy {

  constructor(private itemService: ItemsService) {
  }

  basket!: Items[];

  basketSubscription!: Subscription

  ngOnInit() {
    this.basketSubscription = this.itemService.getItemsFromBasket().subscribe((data) => {
      this.basket = data
    })
  }

  ngOnDestroy() {
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }



}
