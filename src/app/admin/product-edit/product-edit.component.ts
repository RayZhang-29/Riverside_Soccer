import {Component, OnInit} from '@angular/core';
import {Product} from "../../shared/models/product.model";
import {ProductsService} from "../../shared/services/products.service";
import {Cleat} from "../../shared/models/cleat.model";
import {Jersey} from "../../shared/models/jersey.model";
import {MatDialog} from "@angular/material/dialog";
import {CleatAddComponent} from "./cleat-edit/cleat-add/cleat-add.component";
import {JerseysService} from "../../shared/services/jerseys.service";
import {CleatsService} from "../../shared/services/cleats.service";
import {JerseyAddComponent} from "./jersey-edit/jersey-add/jersey-add.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  cleats: Cleat[] = [];

  jerseys: Jersey[] = [];

  selectedProduct: Product;
  selectedCleat: Cleat;
  selectedJersey: Jersey;

  pageSize = 8; // Items per page
  pageSizeOptions: number[] = [8, 20, 50, 100]; // Page size options
  totalCleats = 0; // Total number of products
  pagedJerseys: any[] = [];
  totalJerseys = 0;
  pagedCleats: any[] = [];


  constructor(private productService: ProductsService,
              public dialog: MatDialog,
              private js: JerseysService,
              private cls: CleatsService,
              private router: Router) { }

  ngOnInit(): void {
    this.js.getJerseys().subscribe((jerseys) => {
      this.jerseys = jerseys;
      this.totalJerseys = this.jerseys.length;
      this.paginateJerseys(0, this.pageSize);
    });
    this.cls.getCleats().subscribe((cleats) => {
      this.cleats = cleats;
      this.totalCleats = this.cleats.length;
      this.paginateCleats(0, this.pageSize);
    })
  }

  openAddCleatDialog(): void {
    const dialogRef = this.dialog.open(CleatAddComponent);
    // {data: { cleatId: this.selectedCleat.id}}

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/api/products/all-cleats']).catch();
    });
  }

  openAddJerseyDialog(): void {
    const dialogRef = this.dialog.open(JerseyAddComponent);
    // {data: { cleatId: this.selectedCleat.id}}
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/api/products/all-jerseys']).catch();
    });
  }

  paginateCleats(startIndex: number, endIndex: number) {
    this.pagedCleats = this.cleats.slice(startIndex, endIndex);
  }

  onCleatPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginateCleats(startIndex, endIndex);
  }

  paginateJerseys(startIndex: number, endIndex: number) {
    this.pagedJerseys = this.jerseys.slice(startIndex, endIndex);
  }

  onJerseyPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginateJerseys(startIndex, endIndex);
  }

  deleteCleat(id: number) {
    this.cls.deleteCleat(id).subscribe(response => {
      console.log("delete cleat successfully!");
      this.router.navigate(['/api/products/all-cleats']).catch();
    }, error => {
      console.log("delete cleat failed!");
    });
  }

  deleteJersey(id: number) {
    this.js.deleteJersey(id).subscribe(response => {
      console.log("delete cleat successfully!");
      this.router.navigate(['/api/products/all-jerseys']).catch();
    }, error => {
      console.log("delete cleat failed!");
    });
  }

}


// getAllProducts(): void {
//   this.productService.getAllProducts().subscribe((products) => {
//     this.products = products;
//   });
// }
//
// createProduct(product: Product): void {
//   this.productService.createProduct(product).subscribe(() => {
//     this.getAllProducts();
//   });
// }
//
// updateProduct(product: Product): void {
//   this.productService.updateProduct(product).subscribe(() => {
//     this.getAllProducts();
//   });
// }
//
// deleteProduct(id: number): void {
//   this.productService.deleteProduct(id).subscribe(() => {
//     this.getAllProducts();
//   });
// }
