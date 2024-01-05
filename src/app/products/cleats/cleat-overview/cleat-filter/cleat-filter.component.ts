import {Component, EventEmitter, Output} from '@angular/core';
import {CleatFilter} from "../../../../shared/models/cleatFilter.model";

@Component({
  selector: 'app-cleat-filter',
  templateUrl: './cleat-filter.component.html',
  styleUrls: ['./cleat-filter.component.scss']
})
export class CleatFilterComponent {
  @Output() filterChangeEmitter = new EventEmitter<any>();

  categories = ['FG', 'AG', 'TF'];
  selectedCategory: string | null = null;

  // sizes = ['8', '9', '10', '10.5', '11', '12'];
  // selectedSize: string = null;

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
      selectedCategory: this.selectedCategory,
      selectedBrand: this.selectedBrand,
      selectedAge: this.selectedAge,
      selectedGender: this.selectedGender,
      selectedColor: this.selectedColor
    })
  }
}

// toggleSelection(category: string): void {
//   if (this.selectedCategory === category) {
//     this.selectedCategory = null;
//   } else {
//     this.selectedCategory = category;
//   }
//
//   this.emitFilterChange();
// }
