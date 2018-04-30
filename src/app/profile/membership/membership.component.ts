import { Component, OnInit } from '@angular/core';
import {AppService} from '../../shared/app.service';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/auth.service';
import {AppConstants, AppUrls} from '../../shared/app.constants';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {
  public membership: any = {};
  pForm = new FormGroup({
    cvv: new FormControl(),
    mm: new FormControl(),
    yy: new FormControl(),
    card_type: new FormControl('Credit'),
    card_number: new FormControl(),
    name_on_card: new FormControl()
  });
  constructor(public appService: AppService,
              private router: Router,
              public authService: AuthService,
              public appUrls: AppUrls,
              public appConstants: AppConstants) {}

  ngOnInit() {
    this.getMembership();
  }
  getMembership() {
    this.appService.get(this.appUrls.membership).then((data) => {
      console.log(data);
      if (data['_items'].length === 0) {
        this.membership = null;
      } else {
        this.membership = data['_items'][0];
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  doPayment(amount) {
    console.log(amount);
    const pObj = {
      total_amount: amount,
      payment_date: new Date().toISOString(),
      payment_status: 'active',
      card_details: {
        user_id: this.authService.getUser()['_id'],
        card_number: this.pForm.get('card_number').value,
        card_type: this.pForm.get('card_type').value,
        expire_date: this.pForm.get('mm').value + '/' + this.pForm.get('yy').value,
        cvv: this.pForm.get('cvv').value,
        name_on_card: this.pForm.get('name_on_card').value
      }
    };
    this.appService.post(this.appUrls.payments, pObj).then((data) => {
      console.log('Hello Payment', data);
      const date = new Date();
      const membershipObj = {
        user_id: this.authService.getUser()['_id'],
        plan_expiry: new Date(date.setFullYear(date.getFullYear() + 1)).toISOString(),
        membership_type: 'Individual',
        status: true,
        account_balance: 0,
        plan_balance: this.appConstants.mAmount
      };
      this.appService.post(this.appUrls.membership, membershipObj).then((orderSuccess) => {
        console.log(orderSuccess);
      }).catch((orderErr) => {
        console.log(orderErr);
      });
    }).catch((err) => {
      console.log(err);
    });
  }

}
