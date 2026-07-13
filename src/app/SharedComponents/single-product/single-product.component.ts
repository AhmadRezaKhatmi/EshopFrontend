import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../DTOs/Products/Product';
import {ImagePath} from '../../Utilities/PathTools';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  @Input() product: Product;
  imagePath = ImagePath;

  constructor() {
  }

  ngOnInit(): void {
  }

}
