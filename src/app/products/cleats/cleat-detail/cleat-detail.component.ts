import {Component, OnDestroy, OnInit} from '@angular/core';
import {Cleat} from "../../../shared/models/cleat.model";
import {CleatsService} from "../../../shared/services/cleats.service";
import {WishlistService} from "../../../shared/services/wishlist.service";
import {CartService} from "../../../shared/services/cart.service";
import {Subscription, switchMap} from "rxjs";
import {Jersey} from "../../../shared/models/jersey.model";
import {CartItem} from "../../../shared/models/cart-item.model";
import {JerseySizeGuideComponent} from "../../jerseys/jersey-detail/jersey-size-guide/jersey-size-guide.component";
import {MatDialog} from "@angular/material/dialog";
import {CleatSizeGuideComponent} from "./cleat-size-guide/cleat-size-guide.component";
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../../shared/services/products.service";

@Component({
  selector: 'app-cleat-detail',
  templateUrl: './cleat-detail.component.html',
  styleUrls: ['./cleat-detail.component.scss']
})
export class CleatDetailComponent implements OnInit, OnDestroy {
  cleat: Cleat | undefined = null;

  cleatId: number;
  quantity: number = 1;
  comments: any[] = [];
  rating: number;

  selectedSize!: string;
  sizes: string[] = ['8', '9', '10', '10.5', '11', '12', '13'];

  productsInWishlist: { [productId: number]: boolean } = {};
  productsInWishlistSubscription: Subscription;

  constructor(private cls: CleatsService,
              private ws: WishlistService,
              private cs: CartService,
              private dialog: MatDialog,
              private ar: ActivatedRoute,
              private ps: ProductsService
  ) {}

  ngOnInit(): void {
    this.ar.paramMap
      .pipe(switchMap(params => {
        this.cleatId = +(params.get('id'));
        return this.cls.getCleat(this.cleatId);
      }))
      .subscribe({
        next: cleat => this.cleat = cleat,
        error: err => console.log(err),
        complete: () => ("get cleat")
      });

    this.ps.getComment(this.cleatId).subscribe((commments: any[]) => {
      this.comments = commments;
      console.log("cleat-detail ", this.comments);
    });
    this.ps.getRating(this.cleatId).subscribe((rating: number) => {
      this.rating = rating;
      console.log("cleat-detail ", this.rating);
    })

    this.productsInWishlistSubscription = this.ws.productsInWishlist$.subscribe((status) => {
      this.productsInWishlist = status;
    })
  }

  ngOnDestroy(): void {
    this.productsInWishlistSubscription.unsubscribe();
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  openSizeGuide(): void {
    this.dialog.open(CleatSizeGuideComponent, {
      width: '70vw',
      height: '70vh'
    });
  }

  increaseQuantity(itemId: number): void {
    this.quantity ++ ;
  }
  // TODO: quantity bug
  decreaseQuantity(itemId: number): void {
    if (this.quantity > 1) {
      this.quantity -- ;
    }
  }

  addToWishlist(cleat: Cleat): void {
    this.ws.addToWishlist(cleat);
    this.ws.updateWishlist(cleat.id, true);
  }

  removeFromWishlist(cleat: Cleat): void {
    this.ws.removeFromWishlist(cleat);
    this.ws.updateWishlist(cleat.id, false);
  }

  toggleWishlist(cleat: Cleat): void {
    if (this.productsInWishlist[cleat.id]) {
      this.removeFromWishlist(cleat);
    } else {
      this.addToWishlist(cleat);
    }
  }

  addToCart(cleatId: number, quantity: number = 1): void {
    this.cls.getCleat(cleatId).subscribe((product) => {
      console.log(product);
      const cartItem: CartItem = this.cs.convert(product, quantity, this.selectedSize);
      this.cs.addToCart(cartItem, this.selectedSize);
    })
  }

}
