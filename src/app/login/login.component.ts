import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppUrls} from '../shared/app.constants';
import {AppService} from '../shared/app.service';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  lForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  public returnUrl: any = null;
  constructor(private appService: AppService,
              private appUrls: AppUrls,
              private router: Router,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) {
    this.router.events
      .subscribe(e => {
        // console.log(e);
      });
    this.activatedRoute.queryParams.subscribe((params) => {
      // console.log(params);
      this.returnUrl = params;
    });
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/profile/membership']);
    }
  }

  ngOnInit() {
  }
  login(lUser: any, lValid: any) {
    console.log(lUser);
    this.appService.post(this.appUrls.login, lUser).then((data) => {
      console.log(data);
      if (data['data']) {
        this.authService.setToken(data['data']['login_token']);
        const obj = JSON.stringify({email: data['data']['email'], _id: data['data']['_id']});
        localStorage.setItem('user', obj);
        this.appService.toast(data['data']['email'], 'Successfully Logged in!', 's');
        this.appService.updateUser(data['data']);
        this.router.navigate(['/profile/membership']);
      }
    }).catch((err: HttpErrorResponse) => {
      console.log(err);
      this.appService.errorHandling(err);
    });
  }

}
