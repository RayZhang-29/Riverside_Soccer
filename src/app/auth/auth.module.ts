import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ForgetPasswordComponent} from "./forget-password/forget-password.component";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomStyleModule} from "../shared/modules/custom-style/custom-style.module";

const AuthRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent
  },
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomStyleModule,
    RouterModule.forChild(AuthRoutes),
    ReactiveFormsModule,
  ],
  exports: [RouterModule]
})
export class AuthModule {}
