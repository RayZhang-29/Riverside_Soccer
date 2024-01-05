import { Injectable } from '@angular/core';
import {Jersey} from "../models/jersey.model";
import {Observable, of} from "rxjs";
import {Product} from "../models/product.model";
import {HttpClient} from "@angular/common/http";
import {Cleat} from "../models/cleat.model";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class JerseysService {

  constructor(private httpClient: HttpClient) { }

  getJersey(id: number): Observable<Jersey | any> {
    return this.httpClient.get<Jersey>(`${environment.api_url}/products/jersey-detail/${id}`);
  }

  getJerseys(): Observable<Jersey[]> {
    return this.httpClient.get<Jersey[]>(`${environment.api_url}/products/all-jerseys`);
  }

  updateJersey(id: number, jersey: Jersey): Observable<any> {
    return this.httpClient.put(`${environment.api_url}/products/jersey-detail/${id}`, jersey);
  }

  deleteJersey(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.api_url}/products/jersey-detail/${id}`)
  }

  addJersey(jersey: Jersey): Observable<any> {
    return this.httpClient.post(`${environment.api_url}/products/add-jersey`, jersey);
  }

}


