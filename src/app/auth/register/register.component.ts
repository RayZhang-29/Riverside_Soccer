import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerFormInstance!: FormGroup;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router) {}

  static passwordValidator({value: {password, confirmPassword}}: FormGroup): null | {passwordsNotMatch: string} {
    return password === confirmPassword ? null : {passwordsNotMatch: 'Password and ConfirmedPassword are not the same'};
  }

  ngOnInit() {
    this.registerFormInstance = this.fb.group({
      username: ['', [Validators.email, Validators.required]],  // '' default value
      passwordGroup: this.fb.group({
        password: [''],
        confirmPassword: ''
      }, {validators: [RegisterComponent.passwordValidator]})
    });
  }

  submit(status: number): void {
    if (this.registerFormInstance.valid) {
      const {username, passwordGroup: {password, confirmPassword}} = this.registerFormInstance.value;
      console.log(username, password, 'rc');
      const registerData = {
        username: this.registerFormInstance.get('username').value,
        password: this.registerFormInstance.get('passwordGroup').get('password').value,
        status: status,
      };
      this.auth.register(registerData).subscribe(
        (response) => {
          if (response === 'User registered successfully!') {
            this.router.navigate(['/api/auth/login']).catch();
          } else {
            console.log("User register failed")
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400 && error.error === 'Error: Username is already taken!') {
            alert('The username you entered is already taken. Please choose a different username.');
          } else {
            console.log(error.message);
          }
        }
      );
    } else {
      console.log("Invalid Form");
    }
  }
    // const user = loginForm.value;
    // this.auth.login(user)
    //   .subscribe(res => {
    //     console.log(res);
    //     if (res.success) {
    //       this.auth.user = res.user;
    //       // navigate to home
    //       this.router.navigate(['/login']).catch();
    //       // update login to logout
    //     }
    //   });
}
