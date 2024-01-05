import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AccountComponent} from "./account.component";
import {OrdersComponent} from "./orders/orders.component";
import {AddressComponent} from "./address/address.component";
import {UserInfoComponent} from "./user-info/user-info.component";
import {CommonModule} from "@angular/common";
import {CustomStyleModule} from "../shared/modules/custom-style/custom-style.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import {RatingModule} from "ngx-bootstrap/rating";
import { CommentDialogComponent } from './orders/comment-dialog/comment-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'address',
        component: AddressComponent,
      },
      {
        path: 'user-info',
        component: UserInfoComponent,
      },
    ]
  },
];

@NgModule({
  declarations: [
    AccountComponent,
    AddressComponent,
    OrdersComponent,
    UserInfoComponent,
    CommentDialogComponent,
  ],
  imports: [
    CommonModule,
    CustomStyleModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule,
  ],
  exports: [RouterModule]
})
export class AccountModule {}
