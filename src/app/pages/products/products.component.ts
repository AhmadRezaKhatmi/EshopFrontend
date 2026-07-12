import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {FilterProductsDTO} from '../../DTOs/Products/FilterProductsDTO';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductCategory} from '../../DTOs/Products/ProductCategory';

declare function jqUiSlider();


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  filterProducts: FilterProductsDTO = new FilterProductsDTO(
    '', 0, 0, 1, 0, 0, 0, 6, 0, 1, []
  );
  isLoading = true;
  pages: number[] = [];
  categories: ProductCategory[] = [];
  selectedCategories: number[] = [];

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let pageId = 1;
      if (params.pageId !== undefined) {
        pageId = parseInt(params.pageId, 0);
      }
      this.filterProducts.pageId = pageId;
      this.getProducts();
    });

    this.productsService.getProductActiveCategories().subscribe(res => {
      if (res.status === 'Success') {
        this.categories = res.data;
        console.log(this.categories);
      }
    });

    jqUiSlider();
  }

  filterCategories(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      console.log('add', value);
      this.selectedCategories.push(parseInt(value, 0));
    } else {
      console.log('remove', value);
    }

    console.log(this.selectedCategories);
  }

  setPage(page: number) {
    this.router.navigate(['products'], {queryParams: {pageId: page}});
  }

  getProducts() {
    this.productsService.getFilteredProducts(this.filterProducts).subscribe(res => {
      this.filterProducts = res.data;
      if (res.data.title === null) {
        this.filterProducts.title = '';
      }
      this.isLoading = false;
      this.pages = [];
      for (let i = this.filterProducts.startPage; i <= this.filterProducts.endPage; i++) {
        this.pages.push(i);
      }
    });
  }
}
