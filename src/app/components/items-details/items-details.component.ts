import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Items} from "../../models/items";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-items-details',
  templateUrl: './items-details.component.html',
  styleUrls: ['./items-details.component.scss']
})
export class ItemsDetailsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute) {
  }

  item!: Items

  itemSubscription!: Subscription

  ngOnInit() {
    this.itemSubscription = this.route.data.subscribe((data)=>{
      this.item = data['data']
    })
  }

  ngOnDestroy(){
    if (this.itemSubscription) this.itemSubscription.unsubscribe()
  }
}
