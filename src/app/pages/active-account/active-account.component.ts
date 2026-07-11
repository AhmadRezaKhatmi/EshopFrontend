import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.scss']
})
export class ActiveAccountComponent implements OnInit {

  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.activateUser(this.activatedRoute.snapshot.params.activeCode).subscribe(res => {
      if (res.status === 'Success') {
        this.isLoading = false;
        this.router.navigate(['login']);
      }
    });
  }

}
