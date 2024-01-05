import {Component} from "@angular/core";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}


  submit(loginForm: NgForm): void {
    if (loginForm.valid) {
      const { username, password } = loginForm.value;
      this.auth.login(username, password).subscribe(
        (response) => {
          this.router.navigate(['/']).catch()
        },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Display an error message or an alert
            alert('Incorrect username or password. Please try again.');
          } else {
            // Handle other errors if necessary
            console.log(error.message);
          }
        }
        )
    } else {
      console.log("invalid form");
    }
    // const user = loginForm.value;
    // this.auth.login(user)
    //   .subscribe(res => {
    //     console.log(res);
    //     if (res.success) {
    //       this.auth.user = res.user;
    //       // navigate to home
    //       this.router.navigate(['/home']).catch();
    //       // update login to logout
    //     }
    //   });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']).catch();
  }
}
