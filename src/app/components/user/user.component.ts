import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  user: any;
  id: string;
  typeVolunteer = 'volunteer';
  typeOwner = 'owner';

  loaded: boolean;

  getId() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.loaded = false;
    this.spinner.show();

    this.getId();

    if (this._userService.getId() === this.id) {
      this._router.navigate(['/profile']);
    }

    this._userService.getUser(this.id).subscribe((res) => {
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
}
