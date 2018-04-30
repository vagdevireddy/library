import { Component, OnInit } from '@angular/core';
import {AppService} from '../shared/app.service';
import {AppUrls} from '../shared/app.constants';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public userInfo: any;
  constructor(public appService: AppService,
              private appUrls: AppUrls,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('user')) {
      console.log(JSON.parse(localStorage.getItem('user')));
      const _id = '/' + JSON.parse(localStorage.getItem('user'))['_id'];
      this.appService.get(this.appUrls.users + _id).then((data) => {
        console.log(data);
        if (data) {
          this.userInfo = data;
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  changePassword(obj: any) {
    console.log(obj);
    obj['user_id'] = this.userInfo['_id'];
    obj['token'] = this.authService.getToken('access_token');
    this.appService.post(this.appUrls.change_password, obj).then((data) => {
      console.log(data);
      this.appService.toast('Password changed Successfully', this.userInfo['email'], 's');
      this.appService.get(this.appUrls.logout, {login_token: obj['token']}).then((sLogout) => {
        this.authService.removeToken();
        this.appService.toast('Successfully Logged out', 'Please login Again!', 's');
      })
    }).catch((err) => {
      console.log(err);
    });
  }

}
