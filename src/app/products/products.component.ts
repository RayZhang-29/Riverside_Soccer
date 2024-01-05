import {Component} from "@angular/core";
import {Product} from "../shared/models/product.model";
import {CleatFilter} from "../shared/models/cleatFilter.model";

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  // products: Product[] = [
  //   // Add sample products here
  // ];
  //
  // filteredProducts: Product[] = this.products;
  //
  // applyFilter(filter: CleatFilter) {
  //   // Implement filtering logic here
  // }

  // products: Product[] = [
  //   { id: 1, name: 'Soccer Ball', price: 25 },
  //   { id: 2, name: 'Soccer Shoes', price: 75 },
  //   { id: 3, name: 'Goalkeeper Gloves', price: 55 },
  //   { id: 4, name: 'Team Jersey', price: 120 },
  //   { id: 5, name: 'Soccer Shorts', price: 35 },
  // ];
  //
  // filteredProducts: Product[] = this.products;
  //
  // applyFilter(filterValue: string) {
  //   const [min, max] = filterValue.split('-').map(Number);
  //   this.filteredProducts = this.products.filter(product => {
  //     if (max) {
  //       return product.price >= min && product.price <= max;
  //     } else {
  //       return product.price >= min;
  //     }
  //   });
  // }
}
