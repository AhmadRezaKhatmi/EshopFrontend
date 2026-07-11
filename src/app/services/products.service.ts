import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {FilterProductsDTO} from '../DTOs/Products/FilterProductsDTO';
import {IResponseResult} from '../DTOs/Common/IResponseResult';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private http: HttpClient
  ) {
  }

  getFilteredProducts(): Observable<IResponseResult<FilterProductsDTO>> {
    return this.http.get<IResponseResult<FilterProductsDTO>>('/products/filter-products');
  }
}
