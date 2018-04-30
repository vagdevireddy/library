import { Component, OnInit } from '@angular/core';
import {AppConstants, AppUrls} from '../../shared/app.constants';
import {AppService} from '../../shared/app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  bookParams: any = {};
  details: any = {};
  myDetails: any = {};
  cartItems: any = [];
  constructor(private appUrls: AppUrls,
              private appService: AppService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              public appConstants: AppConstants,
              private router: Router) {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      this.bookParams = {book_name: params['book_name'], isbn: params['isbn']}
    });
    this.myDetails = this.authService.getUser();
  }

  ngOnInit() {
    this.getBookDetails();
    this.appService.cartCast.subscribe((data) => {
      this.cartItems = data;
    });
  }
  getBookDetails() {
    const url = this.appUrls.book_details + JSON.stringify({'ISBN_13': this.bookParams['isbn']});
    this.appService.get(url).then((data) => {
      console.log('details ---- ', data['_items']);
      if (data['_items'].length) {
        this.details = data['_items'][0];
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  requestCopy(book, type) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login-now']);
    } else {
      const found = this.cartItems.filter((cartItem) => {
        return cartItem.bId === book._id;
      });
      if (found.length && book.availability) {
        this.appService.toast(book.book_title, 'Already added in Cart', 'e');
      } else {
        const cart = {
          book: book._id,
          book_type: type,
          user_id: this.myDetails['_id']
        };
        this.appService.post(this.appUrls.cart, cart).then((data) => {
          cart['_id'] = data['_id'];
          cart['_created'] = data['_created'];
          cart['book'] = book;
          this.cartItems.push(cart);
          this.appService.updateCart(this.cartItems);
          this.appService.toast(book.book_title, 'Added to cart', 's');
        });
      }
    }
  }

}
