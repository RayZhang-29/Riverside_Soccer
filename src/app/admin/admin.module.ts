import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {ProductEditComponent} from "./product-edit/product-edit.component";
import {RefundComponent} from "./refund/refund.component";
import {VisualizationComponent} from "./visualization/visualization.component";
import {CommonModule} from "@angular/common";
import {CustomStyleModule} from "../shared/modules/custom-style/custom-style.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import { NgChartsModule} from "ng2-charts";
import { CleatAddComponent } from './product-edit/cleat-edit/cleat-add/cleat-add.component';
import { JerseyAddComponent } from './product-edit/jersey-edit/jersey-add/jersey-add.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'products-edit',
        component: ProductEditComponent
      },
      {
        path: 'refund',
        component: RefundComponent
      },
      {
        path: 'visualization',
        component: VisualizationComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    AdminComponent,
    ProductEditComponent,
    RefundComponent,
    VisualizationComponent,
    CleatAddComponent,
    JerseyAddComponent,
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    CustomStyleModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule,
  ],
  exports: [RouterModule]
})
export class AdminModule {}
