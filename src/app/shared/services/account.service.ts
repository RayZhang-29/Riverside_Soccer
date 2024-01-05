import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
// import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) {
  }

  getUserInfo(userId: number) {
    return this.httpClient.get(`${environment.api_url}/user-info/${userId}`);
  }

  getAddress(userId: number) {
    return this.httpClient.get(`${environment.api_url}/address/${userId}`);
  }

  updateUserInfo(userInfo: any, userId: number) {
    return this.httpClient.put(`${environment.api_url}/user-info/${userId}`, userInfo);
  }

  updateAddress(address: any, userId: number) {
    return this.httpClient.put(`${environment.api_url}/address/${userId}`, address);
  }


}
