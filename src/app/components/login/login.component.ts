import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private _userService: UserService, private _router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.email || !this.password) {
      // this._flash.show('All fields are required', { cssClass: 'alert-danger'});
      return false;
    }

    const user = {
      email: this.email,
      password: this.password,
    };

    this._userService.signIn(user).subscribe((resp) => {
      this._userService.saveUser(resp.data.token, resp.data.id);

      this._router.navigate(['/']);
    });
  }
}
