import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private spinner: NgxSpinnerService
  ) {}

  user: any;
  id: string;

  typeVolunteer = 'volunteer';
  typeOwner = 'owner';

  ngOnInit(): void {
    this.spinner.show();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this._userService.getId() === this.id) {
      this._router.navigate(['/profile']);
    }

    this._userService.getUser(this.id).subscribe((resp) => {
      this.user = resp.data;
      console.log(this.user)

      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    });
  }
}
