import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {OrderBasketDetail} from '../../DTOs/Orders/OrderBasketDetail';
import {count} from 'rxjs/operators';

@Component({
  selector: 'app-header-basket',
  templateUrl: './header-basket.component.html',
  styleUrls: ['./header-basket.component.scss']
})
export class HeaderBasketComponent implements OnInit {

  details: OrderBasketDetail[] = [];
  totalPrice = 0;

  constructor(
    public orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.orderService._getOrderDetails().subscribe(res => {
      this.details = res;
      this.totalPrice = 0;
      if (this.details !== null) {
        for (let i = 0; i < this.details.length; i++) {
          this.totalPrice += this.details[i].price * this.details[i].count;
        }
      }
    });
  }

  removeOrderDetail(detailId: number) {
    this.orderService.removeOrderDetail(detailId).subscribe(res => {
      if (res.status === 'Success') {
        this.orderService._setOrderDetails(res.data);
      }
    });
  }

}
