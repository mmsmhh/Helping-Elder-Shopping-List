import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

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

  constructor(private _userService: UserService, private _router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.email || !this.password) {
      // this._flash.show('All fields are required', { cssClass: 'alert-danger'});
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


    this._userService.signUp(user).subscribe((resp) => {
      if (!resp.success) {
        // this._flash.show(resp.message, { cssClass: 'alert-danger' });
        return false;
      }
      this._router.navigate(['/']);
    });
  }
}
