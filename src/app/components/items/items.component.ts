import {Component, OnDestroy, OnInit} from '@angular/core';
import {Items} from "../../models/items";
import {Subscription} from "rxjs";
import {ItemsService} from "../../services/items.service";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {

  items!: Items[];
  canEdit: boolean = false;
  canView: boolean = true;

  itemsSubscriprion!: Subscription;
  constructor(private ItemsService: ItemsService) {
  }
  ngOnInit() {

    this.canEdit = true

    this.itemsSubscriprion = this.ItemsService.getItems().subscribe((data)=>
    this.items = data)
  }

  ngOnDestroy(){
    if (this.itemsSubscriprion) this.itemsSubscriprion.unsubscribe()
  }
}
