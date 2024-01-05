import {Component, Input} from '@angular/core';
import {Jersey} from "../shared/models/jersey.model";
import {Cleat} from "../shared/models/cleat.model";
import {WishlistService} from "../shared/services/wishlist.service";
import {Product} from "../shared/models/product.model";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {

  wishlist: Product[] = [];

  constructor(private wishlistService: WishlistService,
              private dialogRef: MatDialogRef<WishlistComponent>) { }

  ngOnInit(): void {
    this.wishlistService.getWishlist().subscribe(products => {
      this.wishlist = products;
    });
  }

  removeFromWishlist(product: Product) {
    this.wishlistService.removeFromWishlist(product);
    this.wishlistService.updateWishlist(product.id, false);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  removeAll(): void {
    this.wishlist.forEach((product) => {
      this.wishlistService.updateWishlist(product.id, false);
    });
    this.wishlistService.removeAll();
  }
}
