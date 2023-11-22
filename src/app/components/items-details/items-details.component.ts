import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Items} from "../../models/items";
import {Subscription} from "rxjs";
import {ItemsService} from "../../services/items.service";

@Component({
  selector: 'app-items-details',
  templateUrl: './items-details.component.html',
  styleUrls: ['./items-details.component.scss']
})
export class ItemsDetailsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private ItemsService: ItemsService) {
  }

  item!: Items
  basket!: Items[];
  itemSubscription!: Subscription
  basketSubscription!: Subscription;

  ngOnInit() {
    this.itemSubscription = this.route.data.subscribe((data)=>{
      this.item = data['data']
    })

    this.basketSubscription = this.ItemsService.getItemsFromBasket().subscribe((data) =>
      this.basket = data)
  }


  addToBasket(item: Items) {
    item.quantity = 1
    if (this.basket.length > 0) {
      let findItem = this.basket.find((data) => data.id === item.id)
      if (findItem) this.updateToBasket(findItem)
      else this.postToBasket(item)
    } else this.postToBasket(item)

  }
  postToBasket(item: Items) {
    this.ItemsService.postItemToBasket(item).subscribe((data) => {
      this.basket.push(data)
    })
  }

  updateToBasket(item: Items) {
    item.quantity += 1
    this.ItemsService.updateBasket(item).subscribe()
  }


  ngOnDestroy(){
    if (this.itemSubscription) this.itemSubscription.unsubscribe()
  }
}
