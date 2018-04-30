import { Component, OnInit } from '@angular/core';
import {AppService} from '../shared/app.service';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {AppUrls} from '../shared/app.constants';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public orders: any = [];
  constructor(public appService: AppService,
              public authService: AuthService,
              private router: Router,
              private appUrls: AppUrls) { }

  ngOnInit() {
    this.getOrders();
  }
  getOrders() {
    const embedd = '?embedded=' + JSON.stringify({book_id: 1, payment_id: 1});
    this.appService.get(this.appUrls.orders + embedd).then((data) => {
      console.log(data);
      this.orders = data['_items'];
    }).catch((err) => {
      console.log(err);
    });
  }
  removeChars(url) {
    return url.replace(/\//g, '').replace(/ /g, '-');
  }

}
