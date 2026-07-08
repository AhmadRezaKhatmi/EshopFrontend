import {Injectable} from '@angular/core';
import {RegisterUserDTO} from '../DTOs/Account/RegisterUserDTO';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {
  }

  registerUser(registerData: RegisterUserDTO): Observable<any> {
    return this.http.post<any>('/account/register', registerData);
  }
}
