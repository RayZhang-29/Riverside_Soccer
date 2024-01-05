import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {JerseysService} from "../../../../shared/services/jerseys.service";

@Component({
  selector: 'app-jersey-add',
  templateUrl: './jersey-add.component.html',
  styleUrls: ['./jersey-add.component.scss']
})
export class JerseyAddComponent {
  jerseyAddForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private js: JerseysService,
              public dialogRef: MatDialogRef<JerseyAddComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: { cleatId: number }
  ) {}

  ngOnInit(): void {
    this.jerseyAddForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      brand: ['', Validators.required],
      club: [''],
      country: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      color: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onSubmit() {
    const newJersey = this.jerseyAddForm.value;
    // id: this.data.cleatId
    console.log(newJersey);

    this.js.addJersey(newJersey).subscribe(response => {
      console.log("add cleat successfully!");
    }, error => {
      console.log("add cleat failed!")
    });

    this.dialogRef.close();
    // // this.os.update(this.cleatAddForm.value);
    // this.router.navigate(['./checkout/shipping']).catch();
  }
}
