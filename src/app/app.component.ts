import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {CurrentUser} from './DTOs/Account/CurrentUser';
import {OrderService} from './services/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eshop-pro';

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.authService.checkUserAuth().subscribe(res => {
      if (res.status === 'Success') {
        const user = new CurrentUser(
          res.data.userId,
          res.data.firstName,
          res.data.lastName,
          res.data.address);

        this.authService.setCurrentUser(user);
      }
    });

    this.orderService.getUserBasketDetails().subscribe(res => {
      if (res.status === 'Success') {
        this.orderService._setOrderDetails(res.data);
      }
    });
  }
}
