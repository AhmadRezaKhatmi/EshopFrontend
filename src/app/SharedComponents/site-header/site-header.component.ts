import {Component, OnInit} from '@angular/core';
import {CurrentUser} from '../../DTOs/Account/CurrentUser';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit {

  user: CurrentUser = null;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
      console.log(user);
    });
  }

}
