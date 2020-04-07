import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private _userService: UserService
  ) {}

  typeAll: 'typeAll';
  typeNotAssigned: 'typeNotAssigned';
  userId: string;

  ngOnInit(): void {
    this.userId = this._userService.getId();
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
}
