import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(public _userService: UserService) {}

  ngOnInit(): void {}

  onLogOutClicked(): void {
    this._userService.signOut();
  }

  isLoggedIn()
  {
    return this._userService.isLoggedIn();
  }
}
