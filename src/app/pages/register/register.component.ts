import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterUserDTO} from '../../DTOs/Account/RegisterUserDTO';
import {AuthService} from '../../services/auth.service';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  @ViewChild('sweetAlert') private sweetAlert: SwalComponent;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(
        null,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100)
        ]
      ),
      firstName: new FormControl(
        null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ),
      lastName: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      password: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      confirmPassword: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      address: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(500)
        ])
    });
  }

  submitRegisterForm() {
    console.log(this.registerForm.controls);
    const registerData = new RegisterUserDTO(
      this.registerForm.controls.email.value,
      this.registerForm.controls.firstName.value,
      this.registerForm.controls.lastName.value,
      this.registerForm.controls.password.value,
      this.registerForm.controls.confirmPassword.value,
      this.registerForm.controls.address.value,
    );

    this.authService.registerUser(registerData).subscribe(res => {
      console.log(res);
      if (res.status === 'Success') {
        this.registerForm.reset();
        this.router.navigate(['/login']);
      }
      if (res.status === 'Error') {
        if (res.data.info === 'EmailExist') {
          this.sweetAlert.fire();
        }
      }
    });
  }
}
