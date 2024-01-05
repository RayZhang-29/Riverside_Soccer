import { Injectable } from '@angular/core';
import {Cleat} from "../models/cleat.model";
import {map, Observable, of} from "rxjs";
import {Product} from "../models/product.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class CleatsService {

  constructor(private httpClient: HttpClient) { }

  getCleat(id: number): Observable<Cleat | any> {
    return this.httpClient.get<Cleat>(`${environment.api_url}/products/cleat-detail/${id}`);
    // return of(this.cleats.find(p => p.id === id));
  }

  getCleats(): Observable<Cleat[] | undefined> {
    return this.httpClient.get<Cleat[]>(`${environment.api_url}/products/all-cleats`);
  }

  updateCleat(id: number, cleat: Cleat): Observable<any> {
    return this.httpClient.put(`${environment.api_url}/products/cleat-detail/${id}`, cleat);
  }

  deleteCleat(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.api_url}/products/cleat-detail/${id}`)
  }

  addCleat(cleat: Cleat): Observable<any> {
    return this.httpClient.post(`${environment.api_url}/products/add-cleat`, cleat);
  }
}

