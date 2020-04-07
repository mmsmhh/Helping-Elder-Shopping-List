import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthdate: Date;
  gender: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.gender = 'Male';
  }

  onSubmit() {
    if (!this.firstName) {
      this.toastr.error("First name can't be empty");
      return false;
    }
    if (!this.lastName) {
      this.toastr.error("Last name can't be empty");
      return false;
    }
    if (!this.email) {
      this.toastr.error("Email can't be empty");
      return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
      this.toastr.error('Please write correct email');
      return false;
    }
    if (!this.password) {
      this.toastr.error("Password can't be empty");
      return false;
    }
    if (this.password.length < 8) {
      this.toastr.error("Password can't be less than 8 char");
      return false;
    }
    if (!this.gender) {
      this.toastr.error("Gender can't be empty");
      return false;
    }
    if (!this.birthdate) {
      this.toastr.error("Birthdate can't be empty");
      return false;
    }

    const user = {
      name: {
        firstName: this.firstName,
        lastName: this.lastName,
      },
      email: this.email,
      password: this.password,
      birthdate: this.birthdate,
      gender: this.gender,
    };

    this._userService.signUp(user).subscribe((res) => {
      this.toastr.success('User created successfully');

      this._router.navigate(['/login']);
    },
    (err) => {
      this.toastr.error(err.error.msg);
    });
  }
}
