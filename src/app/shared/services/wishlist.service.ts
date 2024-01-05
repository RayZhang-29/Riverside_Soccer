import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: BehaviorSubject<Product[] | any> = new BehaviorSubject([]);
  // public wishlist$ = this.wishlist.asObservable();
  private productsInWishlist: BehaviorSubject<{ [productId: number]: boolean }> = new BehaviorSubject({});
  public productsInWishlist$ = this.productsInWishlist.asObservable();

  getWishlist(): Observable<Product[]> {
    return this.wishlist.asObservable();
  }

  addToWishlist(product: Product): void {
    const curWishlist = this.wishlist.getValue();
    curWishlist.push(product);
    this.wishlist.next(curWishlist);
  }

  removeFromWishlist(product: Product): void {
    let curWishlist = this.wishlist.getValue();
    curWishlist = curWishlist.filter((p: { id: number; }) => p.id !== product.id);
    this.wishlist.next(curWishlist);
  }

  removeAll(): void {
    this.productsInWishlist.next({});
    this.wishlist.next([]);
  }

  updateWishlist(productId: number, status: boolean): void {
    const curStatus = this.productsInWishlist.getValue();
    this.productsInWishlist.next({...curStatus, [productId]: status});
  }

  constructor() { }
}
