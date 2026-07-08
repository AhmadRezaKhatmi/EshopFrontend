import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginUserDTO} from '../../DTOs/Account/LoginUserDTO';
import {AuthService} from '../../services/auth.service';
import {CurrentUser} from '../../DTOs/Account/CurrentUser';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  @ViewChild('sweetAlert') private sweetAlert: SwalComponent;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(
        null,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100)
        ]
      ),
      password: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
    });
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      const loginData = new LoginUserDTO(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      );

      this.authService.loginUser(loginData).subscribe(res => {
        const currentUser = new CurrentUser(
          res.data.userId,
          res.data.firstName,
          res.data.lastName,
          res.data.address
        );
        if (res.status === 'Success') {
          this.cookieService.set('eshop-cookie', res.data.token, res.data.expireTime * 60);
          this.authService.setCurrentUser(currentUser);
          this.loginForm.reset();
          this.router.navigate(['/']);
        } else if (res.status === 'Error') {
          this.sweetAlert.text = res.data.message;
          this.sweetAlert.fire();
        } else if (res.status === 'NotFound') {
          this.sweetAlert.text = res.data.message;
          this.sweetAlert.fire();
        }
      });
    }
  }

}
