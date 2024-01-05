import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {OrderService} from "../../shared/services/order.service";

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  shippingForm: FormGroup;
  billingForm: FormGroup;
  sameAsShippingAddress: boolean = true;

  constructor(private fb: FormBuilder,
              private router: Router,
              private os: OrderService) { }

  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });

    this.billingForm = this.fb.group({
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  onAddressOptionChange(value: boolean) {
    this.sameAsShippingAddress = value;
    if (value) {
      this.billingForm.reset();
    }
  }

  onSubmit() {
    console.log('Shipping Address:', this.shippingForm.value);
    if (!this.sameAsShippingAddress) {
      console.log('Billing Address:', this.billingForm.value);
      this.os.updateBillingInfo(this.billingForm.value);
    }
    this.os.updateShippingInfo(this.shippingForm.value);
    this.router.navigate(['/api/checkout/payment']).catch();
  }

  onBack() {
    this.router.navigate(['/api/checkout/personal-info']).catch();
  }
}
