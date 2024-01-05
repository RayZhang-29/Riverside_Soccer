import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {BehaviorSubject, catchError, map, Observable, throwError} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<{ token: string, admin: boolean }>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit(): void {
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/login`, { username, password }, {responseType: 'text' as 'json'})
      .pipe(map(response => {
        if (response !== null && response.token !== null) {
          console.log(response);
          // console.log(user);
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
          console.log("log",localStorage.getItem('currentUser'));
        }

        return response;
      }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): Observable<boolean> {
    return this.currentUserSubject.asObservable().pipe(map(user => !!user));
  }

  isAdmin(): boolean {
    const currentUser = JSON.parse(this.currentUserValue);
    // console.log(currentUser.admin);
    return currentUser && currentUser.admin;
  }

  isAuthenticated(): boolean {
    const token = this.currentUserValue.token;
    return !this.jwtHelper.isTokenExpired(token);
  }

  register(registerData: any): Observable<any> {
    console.log(registerData.username, registerData.password, registerData.status);
    return this.http.post<any>(`${environment.api_url}/register`, registerData, {responseType: 'text' as 'json'});
  }

  getUserIdFromToken(token: string): number | null {
    console.log("auth", token);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log(decodedToken);
      return decodedToken.userId;
    }
    return null;
  }

  getUsernameFromToken(token: string): string | null {
    if (token) {

      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.username;
    }
    return null;
  }

  // refreshToken(): Observable<any> {
  //   const refreshToken = localStorage.getItem('refreshToken');
  //   if (refreshToken === null) {
  //     throw new Error('Refresh token not found');
  //   }
  //   console.log(refreshToken);
  //
  //   return this.http.post<any>(`http://localhost:8080/refresh-token`, { refreshToken }).pipe(
  //     map(response => {
  //       if (response && response.accessToken) {
  //         localStorage.setItem('accessToken', response.accessToken);
  //         const currentUser = this.currentUserValue;
  //         currentUser.token = response.accessToken;
  //         localStorage.setItem('currentUser', JSON.stringify(currentUser));
  //         this.currentUserSubject.next(currentUser);
  //       }
  //       return response;
  //     }),
  //   );
  // }
}



// makeRequest() {
//   return this.http.get('http://localhost:8080/refresh-token').pipe(
//     catchError((error) => {
//       if (error.status === 401) {
//         // Handle the expired JWT error here
//         this.router.navigate(['/login']).catch();
//         // You can also show a notification to the user
//       }
//       return throwError(error);
//     })
//   );
// }
