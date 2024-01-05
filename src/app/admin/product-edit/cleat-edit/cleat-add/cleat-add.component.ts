import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {OrderService} from "../../../../shared/services/order.service";
import {CleatsService} from "../../../../shared/services/cleats.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-cleat-add',
  templateUrl: './cleat-add.component.html',
  styleUrls: ['./cleat-add.component.scss']
})
export class CleatAddComponent {
  cleatAddForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cls: CleatsService,
              public dialogRef: MatDialogRef<CleatAddComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { cleatId: number }
  ) {}

  ngOnInit(): void {
    this.cleatAddForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      color: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onSubmit() {
    const newCleat = this.cleatAddForm.value;
      // id: this.data.cleatId
    console.log(newCleat);

    this.cls.addCleat(newCleat).subscribe(response => {
      console.log("add cleat response", response);
      console.log("add cleat successfully!");
    }, error => {
      console.log("add cleat failed!")
    });

    this.dialogRef.close();
    // // this.os.update(this.cleatAddForm.value);
    // this.router.navigate(['./checkout/shipping']).catch();
  }
}
