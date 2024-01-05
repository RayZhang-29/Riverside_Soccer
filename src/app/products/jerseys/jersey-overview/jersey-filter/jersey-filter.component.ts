import {Component, EventEmitter, Input, Output} from '@angular/core';
import { JerseyFilter } from "../../../../shared/models/jerseyFilter.model";
import {Jersey} from "../../../../shared/models/jersey.model";

@Component({
  selector: 'app-jersey-filter',
  templateUrl: './jersey-filter.component.html',
  styleUrls: ['./jersey-filter.component.scss']
})
export class JerseyFilterComponent {
  @Output() filterChangeEmitter = new EventEmitter<any>();

  clubs = [
    'MANCHESTER CITY',
    'BARCELONA',
    'Celtic',
    'MILAN'
  ]
  selectedClub: string[] = [];

  // TODO: filter service
  countries = ['Spain', 'England','Italy','GERMANY','ARGENTINA', 'United Kindom', 'USA']
  selectedCountry: string[] = [];

  brands = ['Adidas', 'Puma', 'Nike'];
  selectedBrand: string[] = [];

  ages = ['Adult', 'Youth'];
  selectedAge: string = null;

  genders = ['Male', 'Female'];
  selectedGender: string = null;

  colors = ['blue', 'white', 'yellow','pink','yellow','red','green','black'];
  selectedColor: string[] = [];

  emitFilterChange(): void {
    this.filterChangeEmitter.emit({
      selectedClub: this.selectedClub,
      selectedCountry: this.selectedCountry,
      selectedBrand: this.selectedBrand,
      selectedAge: this.selectedAge,
      selectedGender: this.selectedGender,
      selectedColor: this.selectedColor
    })
  }
}

// @Input() jerseys!: Jersey[];
// selectedFilters: string[] = [];
// filter: JerseyFilter = {
//   brand: '',
//   size: '',
//   price: ''
// };

// brands = [
//   // Add brands here
//   'adidas',
//   'nike',
//   'puma'
// ];

// sizes = [
//   // Add sizes here
//   'S', 'M', 'L', 'XL'
// ];
//
// priceRanges = [
//   // Add price ranges here
//   { value: '0-50', viewValue: 'Under $50' },
//   { value: '50-100', viewValue: '$50 - $100' },
//   { value: '100-200', viewValue: '$100 - $200' },
//   { value: '200-', viewValue: 'Above $200' }
// ];

// applyFilter() {
//   if (this.selectedFilters.length === 0) {
//     return this.jerseys;
//   }
//
//   return this.jerseys.filter(jersey => {
//     this.selectedFilters.includes(jersey.brand);
//   });
// }
