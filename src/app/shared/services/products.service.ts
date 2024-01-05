import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, retry} from "rxjs";
import {Product} from "../models/product.model";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {
  }

  getProduct(id: number): Observable<Product | any> {
    return this.httpClient.get<Product>(`${environment.api_url}/product/${id}`);
  }

  getProducts(): Observable<Product[] | undefined> {
    return this.httpClient.get<Product[]>(`${environment.api_url}/products`);
  }

  getTopSellingProducts(startDate: string, endDate: string, limit: number = 5): Observable<any> {
    return this.httpClient.get<any>(`${environment.api_url}/products/top-selling-products?startDate=${startDate}&endDate=${endDate}&limit=${limit}`, {
      params: new HttpParams().set('startDate', startDate).set('endDate', endDate)
    });
  }

  getComment(productId: number) {
    return this.httpClient.get(`${environment.api_url}/comment/product/${productId}`);
  }

  getRating(productId: number) {
    return this.httpClient.get(`${environment.api_url}/rating/product/${productId}`);
  }
}
