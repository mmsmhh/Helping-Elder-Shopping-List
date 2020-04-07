import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  user: any;
  typeVolunteer = 'volunteer';
  typeOwner = 'owner';

  ngOnInit(): void {
    this.spinner.show();
    this._userService.getProfile().subscribe((res) => {
      this.user = res.data;
      console.log(this.user);
      this.toastr.success('Hello world!', 'Toastr fun!');
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    });
  }
}
