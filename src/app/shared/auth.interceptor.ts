// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
// import {BehaviorSubject, filter, Observable, switchMap, take, throwError} from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import {AuthService} from "./services/auth.service";
//
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//
//   private isRefreshing = false;
//   private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
//
//
//   constructor(private as: AuthService) {
//   }
//
//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     return next.handle(this.addToken(request)).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 401) {
//           return this.handle401Error(request, next);
//         }
//         return throwError(error);
//       })
//     );
//   }
//
//   private addToken(request: HttpRequest<any>): HttpRequest<any> {
//     const accessToken = localStorage.getItem('accessToken');
//     return request.clone({
//       setHeaders: {
//         Authorization: `Bearer ${accessToken}`
//       }
//     });
//   }
//
//   private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     if (!this.isRefreshing) {
//       this.isRefreshing = true;
//       this.refreshTokenSubject.next(null);
//
//       return this.as.refreshToken().pipe(
//         switchMap((response: any) => {
//           this.isRefreshing = false;
//           this.refreshTokenSubject.next(response.accessToken);
//           localStorage.setItem('accessToken', response.accessToken);
//           return next.handle(this.addToken(request));
//         })
//       );
//     } else {
//       return this.refreshTokenSubject.pipe(
//         filter(token => token != null),
//         take(1),
//         switchMap(() => next.handle(this.addToken(request)))
//       );
//     }
//   }
//
// //     return next.handle(request).pipe(
// //       catchError((error: HttpErrorResponse) => {
// //         if (error.status === 401) {
// //           // Handle the JWT token expiration error here.
// //           // You can redirect the user to the login page or refresh the token.
// //           console.log('JWT token has expired.');
// //         }
// //
// //         return throwError(error);
// //       })
// //     );
// }
