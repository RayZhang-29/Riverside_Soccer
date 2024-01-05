import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CartItem} from "../shared/models/cart-item.model";
import {Subscription} from "rxjs";
import {CartService} from "../shared/services/cart.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  cartItems: CartItem[] = [];

  private cartSubscription: Subscription;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cartSubscription = this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

}
