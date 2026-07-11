import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {FilterProductsDTO} from '../../DTOs/Products/FilterProductsDTO';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  filterProducts: FilterProductsDTO = null;
  isLoading = true;

  constructor(
    private productsService: ProductsService
  ) {
  }

  ngOnInit(): void {
    this.productsService.getFilteredProducts().subscribe(res => {
      this.filterProducts = res.data;
      this.isLoading = false;
    });
  }

}
