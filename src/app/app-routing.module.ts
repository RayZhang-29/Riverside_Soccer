import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {CartComponent} from "./cart/cart.component";
import {WishlistComponent} from "./wishlist/wishlist.component";
import {JerseyDetailComponent} from "./products/jerseys/jersey-detail/jersey-detail.component";
import {SuccessComponent} from "./checkout/success/success.component";

const routes: Routes = [
  {
    path: 'api/home',
    component: HomeComponent
  },
  {
    path: 'api/products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'api/auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'api/cart',
    component: CartComponent
  },
  {
    path: 'api/checkout',
    loadChildren: () => import('./shared/modules/order.module').then(m => m.OrderModule)
  },
  {
    path: 'api/account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'api/admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path:'api/success',
    component: SuccessComponent
  },
  {
    path: 'api/wishlist',
    component: WishlistComponent
  },
  {
    path: '**',
    redirectTo: 'api/home'
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
