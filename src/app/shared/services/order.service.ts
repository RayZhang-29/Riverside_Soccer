import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Order} from "../models/order.model";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import numbers = _default.defaults.animations.numbers;
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private personalInfoSource = new BehaviorSubject(null);
  private shippingInfoSource = new BehaviorSubject(null);
  private paymentInfoSource = new BehaviorSubject(null);
  private billingInfoSource = new BehaviorSubject(null);
  private ordersSubject = new BehaviorSubject<any[]>([]);
  personalInfo$ = this.personalInfoSource.asObservable();
  shippingInfo$ = this.shippingInfoSource.asObservable();
  paymentInfo$ = this.paymentInfoSource.asObservable();
  billingInfo$ = this.billingInfoSource.asObservable();
  orders$ = this.ordersSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  updatePersonalInfo(data: any) {
    this.personalInfoSource.next(data);
  }

  updateShippingInfo(data: any) {
    this.shippingInfoSource.next(data);
  }

  updatePaymentInfo(data: any) {
    this.paymentInfoSource.next(data);
  }

  updateBillingInfo(data: any) {
    this.billingInfoSource.next(data);
  }

  updateOrders(orders: any[]) {
    this.ordersSubject.next(orders);
  }

  getAllOrders(): Observable<any> {
    return this.httpClient.get<any>(`${environment.api_url}/orders`);
  }

  submitOrder(order: any) {
    return this.httpClient.post(`${environment.api_url}/add-order`, order);
  }

  getOrdersByUserId(userId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.api_url}/user/${userId}/orders`);
  }

  submitRating(itemId: number, rateData: any, userId: number) {
    const requestBody = {
      itemId: itemId,
      rateData: rateData,
      userId: userId
    };
    console.log("submit rating ", requestBody);
    return this.httpClient.post(`${environment.api_url}/rating`, requestBody);
  }

  refundRequest(order: any, item: any): Observable<any> {
    const refundRequest = {
      orderItemDto: order,
      productDto: item
    };
    return this.httpClient.post(`${environment.api_url}/refund`, refundRequest);
  }

  getRefunds():Observable<any> {
    return this.httpClient.get(`${environment.api_url}/refund`);
  }

  approveRefund(refundId: number): Observable<any> {
    return this.httpClient.post(`${environment.api_url}/refund/approve/${refundId}`, {});
  }

  refuseRefund(refundId: number): Observable<any> {
    return this.httpClient.post(`${environment.api_url}/refund/refuse/${refundId}`, {});
  }

  getStatus(refundId: number): Observable<any> {
    return this.httpClient.get(`${environment.api_url}/refund/status/${refundId}`);
  }
}
