import {Component, OnInit} from '@angular/core';
import {Subscription, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {JerseysService} from "../../../shared/services/jerseys.service";
import {Jersey} from "../../../shared/models/jersey.model";
import {MatDialog} from "@angular/material/dialog";
import {JerseySizeGuideComponent} from "./jersey-size-guide/jersey-size-guide.component";
import {WishlistService} from "../../../shared/services/wishlist.service";
import {CartItem} from "../../../shared/models/cart-item.model";
import {Product} from "../../../shared/models/product.model";
import {CartService} from "../../../shared/services/cart.service";
import {ProductsService} from "../../../shared/services/products.service";

@Component({
  selector: 'app-jersey-detail',
  templateUrl: './jersey-detail.component.html',
  styleUrls: ['./jersey-detail.component.scss']
})
export class JerseyDetailComponent implements OnInit {
  jersey: Jersey | undefined = null;
  jerseyId: number;
  comments: any[] = [];
  rating: number;

  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  selectedSize!: string;
  quantity: number = 1;

  productsInWishlist: { [productId: number]: boolean } = {};
  productsInWishlistSubscription: Subscription;

  constructor(
    private js: JerseysService,
    private dialog: MatDialog,
    private ws: WishlistService,
    private cs: CartService,
    private ar: ActivatedRoute,
    private ps: ProductsService
    // private ar: ActivatedRoute,
    // private router: Router
  ) {}

  ngOnInit(): void {
    this.ar.paramMap
      .pipe(switchMap(params => {
        this.jerseyId = +(params.get('id'));
        return this.js.getJersey(this.jerseyId);
      }))
      .subscribe({
        next: jersey => this.jersey = jersey,
        error: err => console.log(err),
        complete: () => ("get jersey")
      });

    this.ps.getComment(this.jerseyId).subscribe((commments: any[]) => {
      this.comments = commments;
    });

    this.ps.getRating(this.jerseyId).subscribe((rating: number) => {
      this.rating = rating;
    })

    this.productsInWishlistSubscription = this.ws.productsInWishlist$.subscribe((status) => {
      this.productsInWishlist = status;
    });
  }

  ngOnDestroy(): void {
    this.productsInWishlistSubscription.unsubscribe();
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  openSizeGuide(): void {
    this.dialog.open(JerseySizeGuideComponent, {
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

  addToWishlist(jersey: Jersey): void {
    this.ws.addToWishlist(jersey);
    this.ws.updateWishlist(jersey.id, true);
  }

  removeFromWishlist(jersey: Jersey): void {
    this.ws.removeFromWishlist(jersey);
    this.ws.updateWishlist(jersey.id, false);
  }

  toggleWishlist(jersey: Jersey): void {
    if (this.productsInWishlist[jersey.id]) {
      this.removeFromWishlist(jersey);
    } else {
      this.addToWishlist(jersey);
    }
  }

  addToCart(jerseyId: number, quantity: number = 1): void {
    this.js.getJersey(jerseyId).subscribe((product) => {
      const cartItem: CartItem = this.cs.convert(product, quantity, this.selectedSize);
      this.cs.addToCart(cartItem, this.selectedSize);
    })
  }
}
