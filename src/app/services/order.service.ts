import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IResponseResult} from '../DTOs/Common/IResponseResult';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {
  }


  addProductToOrder(productId: number, count: number): Observable<IResponseResult<any>> {
    const params = new HttpParams().set('productId', productId.toString()).set('count', count.toString());
    return this.http.get<IResponseResult<any>>('/order/add-order', {params});
  }
}
