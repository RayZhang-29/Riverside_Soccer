import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../shared/services/account.service";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;
  address: any;
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

    this.loadAddress();
    this.addressForm = this.fb.group({
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      address: ['', [Validators.required]],
    })
  }

  loadAddress() {
    this.as.getAddress(this.userId).subscribe((address) => {
      this.address = address;
    })
  }

  updateAddress(): void {
    console.log(this.addressForm.value);
    this.as.updateAddress(this.addressForm.value, this.userId).subscribe(() => {
      alert('Address updated successfully');
      this.loadAddress();
    })
    // TODO: UPDATE ADDRESS
  }
}
