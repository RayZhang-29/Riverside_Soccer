import {Component, OnInit} from '@angular/core';
import {Jersey} from "../../../shared/models/jersey.model";
import {JerseysService} from "../../../shared/services/jerseys.service";
import {CartItem} from "../../../shared/models/cart-item.model";
import {CartService} from "../../../shared/services/cart.service";
import {JerseySizeGuideComponent} from "../jersey-detail/jersey-size-guide/jersey-size-guide.component";
import {MatDialog} from "@angular/material/dialog";
import {Options} from "ng5-slider";


@Component({
  selector: 'app-jersey-overview',
  templateUrl: './jersey-overview.component.html',
  styleUrls: ['./jersey-overview.component.scss']
})
export class JerseyOverviewComponent implements OnInit {
  minValue: number = 0;
  maxValue: number = 300;
  sliderOptions: Options = {
    floor: 0,
    ceil: 300,
  };

  jerseys: Jersey[] = [];
  filteredJerseys: Jersey[] = [];

  pageSize = 8; // Items per page
  pageSizeOptions: number[] = [8, 16, 25, 100]; // Page size options
  totalProducts = 0; // Total number of products
  pagedJerseys: any[] = [];

  // showSelectOptions = false;
  // showSizeSelector = false;
  // selectedSize: string | null;
  // sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  constructor(private js: JerseysService,
              private cs: CartService) {
  }

  ngOnInit(): void {
    this.js.getJerseys().subscribe((jerseys) => {
      this.jerseys = jerseys;
      this.filteredJerseys = jerseys;
      this.filterProducts();
      this.totalProducts = this.filteredJerseys.length;
      this.paginateJerseys(0, this.pageSize);
    });
  }

  onSliderChange(): void {
    this.filterProducts();
    this.totalProducts = this.filteredJerseys.length;
    this.paginateJerseys(0, this.pageSize);
  }

  filterProducts(): void {
    this.filteredJerseys = this.jerseys.filter(product => product.price >= this.minValue && product.price <= this.maxValue);
  }

  onFilterChange(filterData: any): void {
    const { selectedClub,
      selectedCountry,
      selectedBrand,
      selectedAge,
      selectedGender,
      selectedColor
    } = filterData;

    this.filteredJerseys = this.jerseys.filter((jersey) => {
      const clubMatch = selectedClub.length === 0 || selectedClub.includes(jersey.club);
      const countryMatch = selectedCountry.length === 0 || selectedCountry.includes(jersey.country);
      const brandMatch = selectedBrand.length === 0 || selectedBrand.includes(jersey.brand);
      const ageMatch = selectedAge === null || jersey.age.includes(selectedAge);
      const genderMatch = selectedGender === null || jersey.gender.includes(selectedGender);
      const colorMatch = selectedColor.length === 0 || selectedColor.includes(jersey.color);

      return clubMatch && countryMatch && brandMatch && ageMatch && genderMatch && colorMatch;
    });

    this.totalProducts = this.filteredJerseys.length;
    this.paginateJerseys(0, this.pageSize);
  }

  paginateJerseys(startIndex: number, endIndex: number) {
    this.pagedJerseys = this.filteredJerseys.slice(startIndex, endIndex);
  }

  onPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginateJerseys(startIndex, endIndex);
  }
}




// onMouseEnter(): void {
//   this.showSelectOptions = true;
// }
//
// onMouseLeave(): void {
//   this.showSelectOptions = false;
// }
//
// onSelectOptionClick(): void {
//   this.showSizeSelector = !this.showSizeSelector;
//   // this.showSelectOptions = false;
// }

// addToCart(jerseyId: number, quantity: number = 1): void {
//   console.log(jerseyId);
//   this.js.getJersey(jerseyId).subscribe((product) => {
//     console.log(product);
//     const cartItem: CartItem = this.cs.convert(product, quantity);
//     this.cs.addToCart(cartItem);
//   })
// }

