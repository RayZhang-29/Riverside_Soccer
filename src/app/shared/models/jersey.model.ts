import {Product} from "./product.model";

export interface Jersey extends Product{
  type: string;
  club: string;
  country: string;
}
