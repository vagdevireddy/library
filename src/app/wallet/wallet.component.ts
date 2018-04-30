import { Component, OnInit } from '@angular/core';
import {AppService} from '../shared/app.service';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {AppUrls} from '../shared/app.constants';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  public tra = {
    MERCHANT_KEY: 'am7eBpic',
    key: 'am7eBpic',
    SALT: 'KJ5oWHOUni',
    txnid: '847d045dccebbea4eb99',
    PAYU_BASE_URL: 'https://sandboxsecure.payu.in/_payment',
    hashSequence: 'key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10',
    furl: 'http://localhost:4200/fauiluretransaction',
    surl: 'http://localhost:4200/successtransaction'
  };
  public userInfo: any = {};
  public user: any = {};
  constructor(private appService: AppService,
              private router: Router,
              private authService: AuthService,
              private appUrls: AppUrls) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login-now']);
    }
  }

  ngOnInit() {
    this.userInfo = this.authService.getUser();
    this.getUser();
  }
  getUser() {
    this.appService.get(this.appUrls.users + '/' + this.userInfo['_id']).then((data) => {
      this.user = data;
    }).catch((err) => {
      console.log(err);
    });
  }

}
