import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, FormsModule} from "@angular/forms";

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (this.data) this.isNew = false
  }

  isNew: boolean = true;

  myForm: FormGroup  = new FormGroup<any>({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? null),
    price: new FormControl(this.data?.price ?? null),
    year: new FormControl(this.data?.year ?? null)
  })


  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    this.data={
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      year: this.myForm.value.year,
      image: "assets/images/Apple Watch SE (2-го поколения).jpg"
    }

    this.dialogRef.close(this.data)
  }


}
