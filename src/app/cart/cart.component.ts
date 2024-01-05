import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {map, Observable, Subscription} from "rxjs";
import {CartItem} from "../shared/models/cart-item.model";
import {CartService} from "../shared/services/cart.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements AfterViewInit, OnInit {
  cartItems: CartItem[] = [];
  paginatedItems: CartItem[] = [];
  itemsPerPage: number = 5;
  quantity: number = 1;

  private cartSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cartService: CartService,
              private router: Router,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.cartSubscription = this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.paginateItems();
      this.getTotalPrice();
      this.cdr.detectChanges();
    });
    this.paginator.page.subscribe(() => {
      this.paginateItems();
    });
  }

  increaseQuantity(itemId: number, size: string): void {
    this.cartService.increaseQuantity(itemId, size);
  }

  decreaseQuantity(itemId: number, size: string): void {
    this.cartService.decreaseQuantity(itemId, size);
  }

  paginateItems(): void {
    const startIndex = this.paginator.pageIndex * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = this.cartItems.slice(startIndex, endIndex);
  }

  removeItem(itemId: number, itemSize: string): void {
    this.cartService.removeItemFromCart(itemId, itemSize);

  }

  updateQuantity(itemId: number, newQuantity: number): void {
    this.cartService.updateItemQuantity(itemId, newQuantity);
  }

  getTotalPrice(): number {
    return this.cartService.getCartTotal();
  }

  // routerLink="/checkout/personal-info"
  onCheckoutClick(): void {
    if (this.isLoggedIn()) {
      this.router.navigate(['/api/checkout/personal-info']).catch();
    } else {
      this.router.navigate(['/api/auth/login']).catch();
    }
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('currentUser');
    console.log(user);
    return !!user;
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}

// TODO: REMOVE ITEM AND CLEAR LOCAL STRORAGE
// if (this.cartItems.length === 0) {
//   localStorage.clear();
// }
