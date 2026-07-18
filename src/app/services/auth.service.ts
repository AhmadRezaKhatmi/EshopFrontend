import {Injectable} from '@angular/core';
import {RegisterUserDTO} from '../DTOs/Account/RegisterUserDTO';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LoginUserDTO} from '../DTOs/Account/LoginUserDTO';
import {ILoginUserAccount} from '../DTOs/Account/ILoginUserAccount';
import {CurrentUser} from '../DTOs/Account/CurrentUser';
import {ICheckUserAuthResult} from '../DTOs/Account/ICheckUserAuthResult';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private currentUser: BehaviorSubject<CurrentUser> = new BehaviorSubject<CurrentUser>(null);

  constructor(
    private http: HttpClient
  ) {
  }

  setCurrentUser(user: CurrentUser): void {
    this.currentUser.next(user);
    this.loggedIn = user !== null;
  }

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });

    return promise;
  }

  getCurrentUser(): Observable<CurrentUser> {
    return this.currentUser;
  }

  registerUser(registerData: RegisterUserDTO): Observable<any> {
    return this.http.post<any>('/account/register', registerData);
  }

  loginUser(loginUserDTO: LoginUserDTO): Observable<ILoginUserAccount> {
    return this.http.post<ILoginUserAccount>('/account/login', loginUserDTO);
  }

  checkUserAuth(): Observable<ICheckUserAuthResult> {
    return this.http.post<ICheckUserAuthResult>('/account/check-auth', null);
  }

  logOutUser(): Observable<any> {
    return this.http.get('/account/sign-out');
  }

  activateUser(emailActiveCode: string): Observable<any> {
    return this.http.get('/account/activate-account/' + emailActiveCode);
  }
}
