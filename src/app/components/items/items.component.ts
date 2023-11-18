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

  items!: Items[];
  canEdit: boolean = false;
  canView: boolean = true;

  itemsSubscriprion!: Subscription;

  constructor(private ItemsService: ItemsService, public dialog: MatDialog) {
  }

  ngOnInit() {

    this.canEdit = true

    this.itemsSubscriprion = this.ItemsService.getItems().subscribe((data) =>
      this.items = data)
  }

  openDialog(): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => this.postData(data))
  }

  postData(data: Items) {
    console.log(data)
    this.ItemsService.postItem(data).subscribe((data) => this.items.push(data))
  }


  ngOnDestroy() {
    if (this.itemsSubscriprion) this.itemsSubscriprion.unsubscribe()
  }
}
