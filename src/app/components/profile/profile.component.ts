import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { User } from '../../models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private datePipe: DatePipe
  ) {}

  typeVolunteer = 'volunteer';
  typeOwner = 'owner';
  modalRef: BsModalRef;
  user: User;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  phoneNumberVerificationToken: string;
  loaded: boolean;

  ngOnInit(): void {
    this.loaded = false;
    this.spinner.show();

    this._userService.getProfile().subscribe((res) => {
      res.data.birthdate = this.datePipe.transform(
        res.data.birthdate,
        'yyyy-MM-dd'
      );

      this.user = res.data;

      setTimeout(() => {
        this.loaded = true;
        this.spinner.hide();
      }, 1000);
    },
    (err) => {
      this.toastr.error(err.error.msg);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  updateUserProfile() {
    if (!this.user.name.firstName) {
      this.toastr.error("First name can't be empty");
      return false;
    }

    if (!this.user.name.lastName) {
      this.toastr.error("Last name can't be empty");
      return false;
    }

    if (!this.user.gender) {
      this.toastr.error("Gender can't be empty");
      return false;
    }

    if (!this.user.birthdate) {
      this.toastr.error("Birthdate can't be empty");
      return false;
    }

    this.modalRef.hide();

    const updatedUser = {
      name: {
        firstName: this.user.name.firstName,
        lastName: this.user.name.lastName,
      },
      address: {
        floor: this.user.address.floor ? this.user.address.floor : undefined,
        apartmentNumber: this.user.address.apartmentNumber
          ? this.user.address.apartmentNumber
          : undefined,
        buildingNumber: this.user.address.buildingNumber
          ? this.user.address.buildingNumber
          : undefined,
        streetName: this.user.address.streetName
          ? this.user.address.streetName
          : undefined,
        district: this.user.address.district
          ? this.user.address.district
          : undefined,
        city: this.user.address.city ? this.user.address.city : undefined,
        country: this.user.address.country
          ? this.user.address.country
          : undefined,
      },
      gender: this.user.gender,
      birthdate: this.user.birthdate,
    };

    this._userService.updateUser(updatedUser).subscribe(
      (res) => {
        res.data.birthdate = this.datePipe.transform(
          res.data.birthdate,
          'yyyy-MM-dd'
        );
        this.user = res.data;
        this.toastr.success('User updated successfully');
      },
      (err) => {
        this.toastr.error(err.error.msg);
      }
    );
  }

  updateUserPassword() {
    if (!this.oldPassword) {
      this.toastr.error("Old password can't be empty");
      return false;
    }
    if (!this.newPassword) {
      this.toastr.error("new password can't be empty");
      return false;
    }
    if (!this.confirmNewPassword) {
      this.toastr.error("Confirm new password can't be empty");
      return false;
    }

    if (
      this.confirmNewPassword.length < 8 ||
      this.oldPassword.length < 8 ||
      this.newPassword.length < 8
    ) {
      this.toastr.error("Passwords length can't be less than 8");
      return false;
    }

    if (this.newPassword != this.confirmNewPassword) {
      this.toastr.error("New password doesn't match with confirm new password");
      return false;
    }

    const passwordObj = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
    };
    this._userService.updatePasswod(passwordObj).subscribe(
      (res) => {
        this.modalRef.hide();
        this.toastr.success('Password updated successfully');
      },
      (err) => {
        this.toastr.error(err.error.msg);
      }
    );
  }
}
