import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
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

    const user = {
      email: this.email,
      password: this.password,
    };

    this._userService.signIn(user).subscribe(
      (resp) => {
        this._userService.saveUser(resp.data.token, resp.data.id);
        this.toastr.success('User logged in successfully');
        window.location.href = '/';
      },
      (err) => {
        this.toastr.error(err.error.msg);
      }
    );
  }
}
