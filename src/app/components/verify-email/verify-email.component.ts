import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _router: Router,
    private route: ActivatedRoute
  ) {}

  emailVerificationToken: string;

  ngOnInit(): void {
    this.emailVerificationToken = this.route.snapshot.paramMap.get(
      'emailVerificationToken'
    );

    this._userService
      .verifyEmail({ emailVerificationToken: this.emailVerificationToken })
      .subscribe((resp) => {
        if (!resp.success) {
          // this._flash.show(resp.message, { cssClass: 'alert-danger' });
          return false;
        }
        this._router.navigate(['/']);
      });
  }
}
