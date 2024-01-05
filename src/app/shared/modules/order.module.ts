import {NgModule} from "@angular/core";
import {CartComponent} from "../../cart/cart.component";
import {CommonModule} from "@angular/common";
import {CustomStyleModule} from "./custom-style/custom-style.module";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CheckoutComponent} from "../../checkout/checkout.component";
import {PersonalInfoComponent} from "../../checkout/personal-info/personal-info.component";
import {PaymentComponent} from "../../checkout/payment/payment.component";
import {ConfirmComponent} from "../../checkout/confirm/confirm.component";
import {SuccessComponent} from "../../checkout/success/success.component";
import {ShippingComponent} from "../../checkout/shipping/shipping.component";
// import {AppModule} from "../../app.module";
import {TimeRangePipe} from "../pipes/time-range.pipe";
import {TermsComponent} from "../../checkout/confirm/terms/terms.component";
import {ConfirmDialogComponent} from "../../checkout/confirm/confirm-dialog/confirm-dialog.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { RatingModule } from 'ngx-bootstrap/rating';
import {StarRatingComponent} from "../../account/orders/star-rating/star-rating.component";
import {CommentComponent} from "../../account/orders/comment/comment.component";
import {ProductsModule} from "../../products/products.module";

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    children: [
      {
        path: 'personal-info',
        component: PersonalInfoComponent
      },
      {
        path: 'shipping',
        component: ShippingComponent
      },
      {
        path: 'payment',
        component: PaymentComponent
      },
      {
        path: 'confirm',
        component: ConfirmComponent
      }
    ]
  },
]

@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
    PersonalInfoComponent,
    PaymentComponent,
    ConfirmComponent,
    SuccessComponent,
    TimeRangePipe,
    ShippingComponent,
    TermsComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    CustomStyleModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule,
    RatingModule.forRoot(),
    // ProductsModule
  ],
  exports: [RouterModule]
})
export class OrderModule {

}
