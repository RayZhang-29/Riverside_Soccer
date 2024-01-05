import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../../../shared/models/product.model";
import {CleatFilter} from "../../../shared/models/cleatFilter.model";
import {Cleat} from "../../../shared/models/cleat.model";
import {JerseysService} from "../../../shared/services/jerseys.service";
import {CartService} from "../../../shared/services/cart.service";
import {CleatsService} from "../../../shared/services/cleats.service";
import {CartItem} from "../../../shared/models/cart-item.model";
import {Options} from "ng5-slider";

@Component({
  selector: 'app-cleat-overview',
  templateUrl: './cleat-overview.component.html',
  styleUrls: ['./cleat-overview.component.scss']
})
export class CleatOverviewComponent implements OnInit {
  cleats: Cleat[] = [];
  filteredCleats: Cleat[] = [];

  minValue: number = 0;
  maxValue: number = 300;
  sliderOptions: Options = {
    floor: 0,
    ceil: 300,
  };

  pageSize = 8; // Items per page
  pageSizeOptions: number[] = [8, 16, 25, 100]; // Page size options
  totalProducts = 0; // Total number of products
  pagedCleats: any[] = [];


  constructor(private cls: CleatsService,
              private cs: CartService) {
  }

  ngOnInit(): void {
    this.cls.getCleats().subscribe(
      (cleats) => {
      console.log(cleats);
      this.cleats = cleats;
      this.filteredCleats = cleats;
      this.filterProducts();
      this.totalProducts = this.filteredCleats.length;
      this.paginateCleats(0, this.pageSize);
    })
  }

  onSliderChange(): void {
    this.filterProducts();
    this.totalProducts = this.filteredCleats.length;
    this.paginateCleats(0, this.pageSize);
  }

  filterProducts(): void {
    this.filteredCleats = this.cleats.filter(product => product.price >= this.minValue && product.price <= this.maxValue);
  }

  onFilterChange(filterData: any): void {
    const {
      selectedCategory,
      selectedBrand,
      selectedAge,
      selectedGender,
      selectedColor
    } = filterData;

    this.filteredCleats = this.cleats.filter((cleat) => {
      const categoryMatch = selectedCategory.length === 0 || cleat.category.includes(selectedCategory);
      const brandMatch = selectedBrand.length === 0 || selectedBrand.includes(cleat.brand);
      const ageMatch = selectedAge === null || cleat.age.includes(selectedAge);
      const genderMatch = selectedGender === null || cleat.gender.includes(selectedGender);
      const colorMatch = selectedColor.length === 0 || selectedColor.includes(cleat.color);

      return categoryMatch && brandMatch && ageMatch && genderMatch && colorMatch;
    });
    this.totalProducts = this.filteredCleats.length;
    this.paginateCleats(0, this.pageSize);
  }

  paginateCleats(startIndex: number, endIndex: number) {
    this.pagedCleats = this.filteredCleats.slice(startIndex, endIndex);
  }

  onPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginateCleats(startIndex, endIndex);
  }

}

// addToCart(cleatId: number, quantity: number = 1): void {
//   console.log(cleatId);
//   this.cls.getCleat(cleatId).subscribe((product) => {
//     console.log(product);
//     const cartItem: CartItem = this.cs.convert(product, quantity);
//     this.cs.addToCart(cartItem);
//   })
// }
