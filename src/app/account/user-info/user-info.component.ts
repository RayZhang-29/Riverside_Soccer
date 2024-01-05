import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../shared/services/order.service";
import {AccountService} from "../../shared/services/account.service";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  userInfoForm: FormGroup;
  userInfo: any;
  userId: number;

  constructor(private fb: FormBuilder,
              private as: AccountService,
              private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.currentUser.subscribe((user) => {
      const currentUser = JSON.parse(user);
      this.userId = this.auth.getUserIdFromToken(`Bearer ${currentUser.token}`)
      console.log(this.userId);
    });
    this.loadUserInfo();
    this.userInfoForm = this.fb.group({
      phoneNumber: ['', Validators.required],
    })
  }

  loadUserInfo() {
    this.as.getUserInfo(this.userId).subscribe((userInfo) => {
      this.userInfo = userInfo;
    })
  }

  updateUserInfo() {
    if (this.userInfoForm.valid) {
      console.log(this.userInfoForm.value);
      this.as.updateUserInfo(this.userInfoForm.value, this.userId).subscribe(() => {
        alert('User Info updated successfully');
        this.loadUserInfo();
      });

    }
  }
}


// Update user info logic here
// TODO: update user info to backend API (user service)
// console.log(this.userInfoForm.value);
// const { name, phoneNumber } = this.userInfoForm.value;
// this.userService.updateUserInfo(name, phoneNumber).subscribe((result) => {
//   if (result) {
//     console.log('User info updated successfully');
//   } else {
//     console.log('Failed to update user info');
//   }
// });
