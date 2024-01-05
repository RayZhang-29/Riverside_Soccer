import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../../shared/services/order.service";
import {forkJoin, Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {TermsComponent} from "./terms/terms.component";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {CartItem} from "../../shared/models/cart-item.model";
import {CartService} from "../../shared/services/cart.service";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit, OnDestroy {
  user: any;
  personalInfo: any;
  shippingInfo: any;
  paymentInfo: any;
  billingInfo: any;
  cartItems: CartItem[] = [];
  subscriptions: Subscription[] = [];

  termsAccepted: boolean = false;

  constructor(private os: OrderService,
              private dialog: MatDialog,
              private cs: CartService,
              private router: Router,
              private auth: AuthService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.os.personalInfo$.subscribe(data => this.personalInfo = data),
      this.os.shippingInfo$.subscribe(data => this.shippingInfo = data),
      this.os.paymentInfo$.subscribe(data => this.paymentInfo = data),
      this.os.billingInfo$.subscribe(data => this.billingInfo = data)
    );
    this.auth.currentUser.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    })
    this.user = this.auth.currentUserValue;
    this.cs.getCartItems().subscribe(items => {
      this.cartItems = items;
      console.log(this.cartItems);
    });
  }

  openTermsDialog(event: Event): void {
    event.preventDefault();
    this.dialog.open(TermsComponent);
  }

  onPurchase(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    this.termsAccepted = false;

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.completePurchase();
      }
    });
  }

  getTotalPrice(): number {
    return this.cartService.getCartTotal();
  }

  completePurchase(): void {
      const orderData = {
        userToken: JSON.parse(this.user),
        personalInfo: this.personalInfo,
        shippingInfo: this.shippingInfo,
        paymentInfo: this.paymentInfo,
        billingInfo: this.billingInfo ? this.billingInfo : this.shippingInfo,
        cartItems: this.cartItems
      }
      // };
      console.log("orderData ", orderData);
      this.os.submitOrder(orderData).subscribe(response => {
        console.log('Order submitted:', response);
        this.router.navigate(['/api/success']).catch();
      }, error => {
        console.error('Error submitting order:', error);
      });
    // });
  }

  onBack() {
    this.router.navigate(['/api/checkout/personal-info']).catch();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

// forkJoin([
//   this.os.personalInfo$,
//   this.os.shippingInfo$,
//   this.os.paymentInfo$,
//   this.os.billingInfo$
// ]).subscribe(([personalInfo, shippingInfo, paymentInfo, billingInfo]) => {
