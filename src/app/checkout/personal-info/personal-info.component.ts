import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {OrderService} from "../../shared/services/order.service";

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent {
  personalInfoForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private os: OrderService) {}

  ngOnInit(): void {
    this.personalInfoForm = this.fb.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log(this.personalInfoForm.value);
    this.os.updatePersonalInfo(this.personalInfoForm.value);
    this.router.navigate(['/api/checkout/shipping']).catch();
  }

  onBack() {
    this.router.navigate(['/api/cart']).catch();
  }
}
