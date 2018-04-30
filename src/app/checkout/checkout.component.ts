import { Component, OnInit } from '@angular/core';
import {AppService} from '../shared/app.service';
import {AppConstants, AppUrls} from '../shared/app.constants';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public toggle: any = {address: true, payment: false};
  public newAddress: any = {clicked: false};
  public shipping_address: any = {};
  public userInfo: any = {};
  public totalPrice: any = 0;
  public cartResults = [];
  pForm = new FormGroup({
    cvv: new FormControl(),
    mm: new FormControl(),
    yy: new FormControl(),
    card_type: new FormControl('Credit'),
    card_number: new FormControl(),
    name_on_card: new FormControl()
  });
  constructor(private appService: AppService,
              private appUrls: AppUrls,
              private activatedRoute: ActivatedRoute,
              public appConstants: AppConstants,
              private authService: AuthService,
              private router: Router) {
    this.userInfo = this.authService.getUser();
  }
  getTotalPrice(item, book) {
    const bPrice = (item['book_type'] === 'ecopy') ? book['ecopy_price'] : book['hcopy_price'];
    book.book_price = Number((( bPrice / 100) * this.appConstants['lease_rate']).toFixed(2));
    return book.book_price;
  }
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.appService.cartCast.subscribe((results) => {
        this.cartResults = results;
        for (let i = 0; i < results.length; i ++) {
          const book = results[i]['book'],
            cartItem = results[i];
          book['image_thumbnail'] = this.appService.checkHttps(book['image_thumbnail']);
          book['image_small_thumbnail'] = this.appService.checkHttps(book['image_small_thumbnail']);
          book['book_type'] = (cartItem['book_type'] === 'ecopy') ? 'E-Copy' : 'Hard Copy';
          console.log('My items from parse: ', cartItem);
          this.totalPrice = this.totalPrice + this.getTotalPrice(cartItem, book);
        }
      });
    }
    // Get User info
    this.appService.get(this.appUrls.users + '/' + this.userInfo._id).then((data) => {
      console.log(data);
      this.userInfo = data;
      this.shipping_address = data['shipping_address'];
    }).catch((err) => {
      console.log(err)
    });
  }
  doPayment(payment: any) {
    const pObj = {
      total_amount: payment,
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
      const order_object = {
        total_amount: payment,
        // book_id: this.details['_id'],
        user_id: this.authService.getUser()['_id'],
        shipping_address: this.shipping_address,
        ordered_date: date.toISOString(),
        delivery_date: new Date(date.setDate(date.getDate() + 2)).toISOString(),
        delivery_status: 'progress',
        payment_id: data['_id']
      };
      this.appService.post(this.appUrls.orders, order_object).then((orderSuccess) => {
        console.log(orderSuccess);
        this.router.navigate(['/order-success', orderSuccess._id]);
      }).catch((orderErr) => {
        console.log(orderErr);
      });
    }).catch((err) => {
      console.log(err);
    });
  }
}
