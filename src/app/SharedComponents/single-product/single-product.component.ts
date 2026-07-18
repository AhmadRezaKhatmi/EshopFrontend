import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../DTOs/Products/Product';
import {ImagePath} from '../../Utilities/PathTools';
import {OrderService} from '../../services/order.service';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  @Input() product: Product;
  imagePath = ImagePath;
  productName: string;
  @ViewChild('sweetAlert') private sweetAlert: SwalComponent;

  constructor(
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.productName = this.product.productName.replace(/\s/g, '-');
  }

  addProductToOrder() {
    const productId = this.product.id;
    const count = 1;
    this.orderService.addProductToOrder(productId, count).subscribe(res => {
      this.orderService._setOrderDetails(res.data.details);
      this.sweetAlert.text = 'محصول با موفقیت به سبد خرید اضافه شد';
      this.sweetAlert.fire();
    });
  }

}
