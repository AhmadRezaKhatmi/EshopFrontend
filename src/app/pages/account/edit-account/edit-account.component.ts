import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {EditUserDTO} from '../../../DTOs/Account/EditUserDTO';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {CurrentUser} from '../../../DTOs/Account/CurrentUser';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {

  editUser: FormGroup;
  currentUser: CurrentUser;
  @ViewChild('sweetAlert') private sweetAlert: SwalComponent;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {

    this.authService.getCurrentUser().subscribe(res => {
      this.currentUser = res;

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
      const user = new EditUserDTO(
        this.editUser.controls.firstName.value,
        this.editUser.controls.lastName.value,
        this.editUser.controls.address.value
      );
      this.authService.editUserAccount(user).subscribe(res => {
        if (res.status === 'Success') {
          this.sweetAlert.text = res.data.message;
          this.sweetAlert.fire();
          this.authService.setCurrentUser(new CurrentUser(
            this.currentUser.userId,
            user.firstName,
            user.lastName,
            user.address
          ));
        }
      });
    } else {
      this.editUser.markAllAsTouched();
    }
  }

}
