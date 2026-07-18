import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {

  editUser: FormGroup;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {

    this.authService.getCurrentUser().subscribe(res => {

      this.editUser = new FormGroup({
        firstName: new FormControl(
          res.firstName,
          [
            Validators.required,
            Validators.maxLength(100)
          ]
        ),
        lastName: new FormControl(
          res.lastName,
          [
            Validators.required,
            Validators.maxLength(100)
          ]),
        address: new FormControl(
          res.address,
          [
            Validators.required,
            Validators.maxLength(500)
          ])
      });
    });
  }

  submitEditUserForm() {
    if (this.editUser.valid) {

    } else {
      this.editUser.markAllAsTouched();
    }
  }

}
