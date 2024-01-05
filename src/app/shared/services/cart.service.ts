import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {CartItem} from "../models/cart-item.model";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = this.getItemsFromLocalStorage();
  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject(
    this.cartItems
  );

  constructor() {}

  // ngOnInit(): void {
  //   this.getItemsFromLocalStorage();
  // }

  private getItemsFromLocalStorage(): CartItem[] {
    try {
      const cartItems = localStorage.getItem('cartItems');
      return cartItems ? JSON.parse(cartItems) : [];
    } catch (error) {
      console.error('Error reading cart items from local storage:', error);
      return [];
    }

    // const cartItems = localStorage.getItem('cartItems');
    // if (cartItems) {
    //   this.cartItems = JSON.parse(cartItems);
    // } else {
    //   this.cartItems = [];
    // }

    return this.cartItems;
  }

  private saveCartItemsToLocalStorage(cartItems: CartItem[]): void {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart items to local storage:', error);
    }
    // localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  // TODO: CART AND Local Storage
  addToCart(item: CartItem, size: string): void {
    if (!this.cartItems || this.cartItems.length === 0) {
      item.size = size;
      this.cartItems.push(item);
      this.cartItemsSubject.next(this.cartItems);
      this.saveCartItemsToLocalStorage(this.cartItems);
      return;
    }
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id && cartItem.size === size);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }

    this.cartItemsSubject.next(this.cartItems);
    this.saveCartItemsToLocalStorage(this.cartItems);
  }

  removeItemFromCart(itemId: number, size: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId || (item.id === itemId && item.size !== size));
    this.cartItemsSubject.next(this.cartItems);
  }

  updateItemQuantity(itemId: number, newQuantity: number): void {
    const item = this.cartItems.find(cartItem => cartItem.id === itemId);

    if (item) {
      item.quantity = newQuantity;
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  increaseQuantity(productId: number, size: string): void {
    const item = this.cartItems.find(cartItem => cartItem.id === productId && cartItem.size === size);
    if (item) {
      item.quantity ++ ;
    }
    this.cartItemsSubject.next(this.cartItems);
  }

  decreaseQuantity(productId: number, size: string): void {
    const item = this.cartItems.find(cartItem => cartItem.id === productId && cartItem.size === size);
    if (item && item.quantity > 1) {
      item.quantity -- ;
    }
    this.cartItemsSubject.next(this.cartItems);
  }

  getCartTotal(): number {
    if (!this.cartItems || this.cartItems.length === 0) {
      return 0;
    }
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  //   // if (this.cartItems.length === 0) return 0;
  //   this.getCartItems().subscribe(cartItems => {
  //     this.cartItems = cartItems;
  //   });
  //   if (!this.cartItems || this.cartItems.length === 0) {
  //     return 0;
  //   }
  //   return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  // }

  convert(product: Product, quantity: number = 1, selectedSize: string): CartItem {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      size: selectedSize
    };
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }

  // ngOnDestroy(): void {
  //   this.cartItemsSubject.unsubscribe();
  // }
  unsubscribeFromCartItems(): void {
    this.cartItemsSubject.unsubscribe();
  }
}
