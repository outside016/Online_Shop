import {Component, OnDestroy, OnInit} from '@angular/core';
import {Items} from "../../models/items";
import {Subscription} from "rxjs";
import {ItemsService} from "../../services/items.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxComponent} from "../UI/dialog-box/dialog-box.component";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {
  constructor(private ItemsService: ItemsService, public dialog: MatDialog) {
  }

  items!: Items[];
  canEdit: boolean = false;
  canView: boolean = true;

  itemsSubscription!: Subscription;


  basket!: Items[];
  basketSubscription!: Subscription;

  ngOnInit() {

    this.canEdit = true

    this.itemsSubscription = this.ItemsService.getItems().subscribe((data) =>
      this.items = data)

    this.basketSubscription = this.ItemsService.getItemsFromBasket().subscribe((data) =>
      this.basket = data)

  }

  openDialog(item?: Items): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.data = item
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {

      if (data) {

        if (data && data.id) {
          this.updateItem(data)
        } else
          this.postData(data)
      }
    })
  }

  postData(data: Items) {
    this.ItemsService.postItem(data).subscribe((data) => this.items.push(data))
  }


  deleteItem(id: number) {
    this.ItemsService.deleteItem(id).subscribe(() => this.items.find((item) => {
        if (id === item.id) {
          let idx = this.items.findIndex((data) => id === data.id)
          this.items.splice(idx, 1)
        }
      })
    )
  }

  updateItem(item: Items) {
    this.ItemsService.updateItem(item).subscribe((data) => {
      this.items = this.items.map((item) => {
        if (item.id === data.id) return data
        else return item
      })

    })
  }

  addToBasket(item: Items) {
    item.quantity = 1

    let findItem;

    if (this.basket.length > 0) {
      findItem = this.basket.find((data) => data.id === item.id)
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
    this.ItemsService.updateBasket(item).subscribe((data) => {
      console.log(data)
    })
  }

  ngOnDestroy() {
    if (this.itemsSubscription) this.itemsSubscription.unsubscribe()
    if (this.basketSubscription) this.basketSubscription.unsubscribe()
  }
}
