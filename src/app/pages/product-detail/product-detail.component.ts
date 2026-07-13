import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ImagePath} from '../../Utilities/PathTools';
import {Product} from '../../DTOs/Products/Product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  imagePath = ImagePath;
  product: Product;

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const productId = params.productId;
      if (productId === undefined) {
        this.router.navigate(['']);
      }

      this.productService.getSingleProduct(productId).subscribe(res => {
        if (res.status === 'NotFound') {
          this.router.navigate(['']);
        } else if (res.status === 'Success') {
          this.product = res.data;
        }
      });
    });
  }

}
