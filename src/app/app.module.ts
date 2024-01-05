import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./header/header.component";
import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductsHeaderComponent } from './products-header/products-header.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import {ProductsComponent} from "./products/products.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomStyleModule} from "./shared/modules/custom-style/custom-style.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LinkHoverDirective} from "./shared/directive/linkHover.directive";
import {FooterComponent} from "./footer/footer.component";
import {AuthModule} from "./auth/auth.module";
import {JerseysService} from "./shared/services/jerseys.service";
import {CleatsService} from "./shared/services/cleats.service";
import {WishlistService} from "./shared/services/wishlist.service";
import {OrderModule} from "./shared/modules/order.module";
import { SummaryComponent } from './checkout/summary/summary.component';
import { SearchComponent } from './search/search.component';
import {RatingModule} from "ngx-bootstrap/rating";
import {AccountModule} from "./account/account.module";
import {JwtInterceptor, JwtModule} from "@auth0/angular-jwt";
import {AdminModule} from "./admin/admin.module";
import { NgChartsModule } from 'ng2-charts';

export function tokenGetter(): string | null {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  return currentUser.token;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    WishlistComponent,
    ProductsHeaderComponent,
    CarouselComponent,
    ProductsComponent,
    LinkHoverDirective,
    FooterComponent,
    SummaryComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CustomStyleModule,
    HttpClientModule,
    AuthModule,
    OrderModule,
    RatingModule,
    AccountModule,
    AdminModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['http://localhost:8080/authenticate']
      },
    }),
    NgChartsModule,
  ],
  providers: [JerseysService, CleatsService, WishlistService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } ],
  exports: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
