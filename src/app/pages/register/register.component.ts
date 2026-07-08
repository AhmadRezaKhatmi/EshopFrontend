import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterUserDTO} from '../../DTOs/Account/RegisterUserDTO';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(
        null,
        [
          Validators.required,
          Validators.email
        ]
      ),
      firstName: new FormControl(),
      lastName: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
      address: new FormControl()
    });
  }

  submitRegisterForm() {
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
      }
    });
  }

}
