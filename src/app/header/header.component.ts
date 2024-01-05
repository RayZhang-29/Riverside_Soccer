import {Component, OnInit} from "@angular/core";
import {AuthService} from "../shared/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {WishlistComponent} from "../wishlist/wishlist.component";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  title = "Riverside Soccer";

  isAdmin: boolean;
  isLoggedIn$: Observable<boolean>;

  constructor(public auth: AuthService,
              private dialog: MatDialog,
              private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.auth.isLoggedIn();

    this.auth.currentUser.subscribe((user) => {
      if (user) {
        // console.log(user)
        this.isAdmin = this.auth.isAdmin();
      }
    });
  }

  showWishlist: boolean = false;

  toggleWishlist(): void {
    this.showWishlist = !this.showWishlist;
    this.openDialog();
  }

  openDialog(): void {
    this.dialog.open(WishlistComponent, {
      hasBackdrop: true // Close the dialog when clicking outside (default is true)
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']).catch();
  }

  // routeToUserInfo(): void {
  //   this.router.navigate(['/account/user-info']).catch();
  // }
}
