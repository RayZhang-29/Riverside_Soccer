import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {Router} from "@angular/router";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-comfirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  totalPrice: number;
  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.totalPrice = this.cartService.getCartTotal() + 10;
  }
}
