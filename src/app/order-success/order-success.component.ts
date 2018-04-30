import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '../shared/app.service';
import {AppUrls} from '../shared/app.constants';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  urlParams: any = {};
  public myOrder: any = {};
  constructor(private activatedRoute: ActivatedRoute,
              public appService: AppService,
              private appUrls: AppUrls) {
    this.activatedRoute.params.subscribe((params) => {
      this.urlParams = params;
    });
  }
  ngOnInit() {
    this.getOrder();
  }
  getOrder() {
    const embedded = JSON.stringify({book_id: 1, payment_id: 1});
    const query = '/' + this.urlParams['order_id'] + '?embedded=' + embedded;
    this.appService.get(this.appUrls.orders + query).then((data) => {
      console.log(data);
      this.myOrder = data;
    }).catch((err) => {
      console.log(err);
    });
  }

}
