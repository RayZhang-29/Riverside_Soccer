import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {OrderModule} from "../../shared/modules/order.module";
import {OrderService} from "../../shared/services/order.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private os: OrderService) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      cardNumber: ['', Validators.required],
      cardOwner: ['', Validators.required],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', Validators.required],
      CCV: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.paymentForm.value);
    this.os.updatePaymentInfo(this.paymentForm.value);
    this.router.navigate(['/api/checkout/confirm']).catch()
  }

  currentYear(): number {
    return new Date().getFullYear();
  }

  onBack() {
    this.router.navigate(['/api/checkout/shipping']).catch();
  }
}
