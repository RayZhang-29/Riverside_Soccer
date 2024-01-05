import {NgModule} from "@angular/core";
import {CleatFilterComponent} from "./cleats/cleat-overview/cleat-filter/cleat-filter.component";
import {CleatOverviewComponent} from "./cleats/cleat-overview/cleat-overview.component";
import {JerseyFilterComponent} from "./jerseys/jersey-overview/jersey-filter/jersey-filter.component";
import {JerseyOverviewComponent} from "./jerseys/jersey-overview/jersey-overview.component";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "./products.component";
import {CleatsComponent} from "./cleats/cleats.component";
import { JerseysComponent } from './jerseys/jerseys.component';
import {CustomStyleModule} from "../shared/modules/custom-style/custom-style.module";
import { CleatDetailComponent } from './cleats/cleat-detail/cleat-detail.component';
import { JerseyDetailComponent } from './jerseys/jersey-detail/jersey-detail.component';
import { JerseySizeGuideComponent } from './jerseys/jersey-detail/jersey-size-guide/jersey-size-guide.component';
import {FormsModule} from "@angular/forms";
// import { ProductReviewComponent } from './product-review/product-review.component';
// import { RatingComponent } from './rating/rating.component';
import {RatingModule} from "ngx-bootstrap/rating";
import {StarRatingComponent} from "../account/orders/star-rating/star-rating.component";
import {CommentComponent} from "../account/orders/comment/comment.component";
import { CleatSizeGuideComponent } from './cleats/cleat-detail/cleat-size-guide/cleat-size-guide.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: 'all-cleats',
        component: CleatsComponent
      },
      {
        path: 'all-jerseys',
        component: JerseysComponent
      },
      {
        path: 'jersey-detail/:id',
        component: JerseyDetailComponent
      },
      {
        path: 'cleat-detail/:id',
        component: CleatDetailComponent
      },
      {
        path: '**',
        component: CleatsComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    CleatFilterComponent,
    CleatOverviewComponent,
    CleatsComponent,
    JerseyFilterComponent,
    JerseyOverviewComponent,
    JerseysComponent,
    CleatDetailComponent,
    JerseyDetailComponent,
    JerseySizeGuideComponent,
    // ProductReviewComponent,
    // RatingComponent,
    StarRatingComponent,
    CommentComponent,
    CleatSizeGuideComponent
  ],
    imports: [
      CommonModule,
      CustomStyleModule,
      RouterModule.forChild(routes),
      FormsModule,
      RatingModule.forRoot()
    ],
  exports: [RouterModule]
})

export class ProductsModule { }
