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


  minusItemFromBasket(item: Items) {
    if (item.quantity === 1 ){
      this.itemService.deleteItemFromBasket(item.id).subscribe(()=>{
        let idx = this.basket.findIndex((data)=>data.id === item.id)
        this.basket.splice(idx,1)
    })
    }else {
      item.quantity -= 1;
      this.itemService.updateBasket(item).subscribe()
    }
  }

  plusItemFromBasket(item: Items) {
    item.quantity += 1;
    this.itemService.updateBasket(item).subscribe()
  }


  ngOnDestroy() {
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }

}
