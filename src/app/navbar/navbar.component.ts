import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import 'rxjs/add/observable/of';

import {ActivatedRoute, Router} from '@angular/router';
import {FilterArray} from '../shared/app.pipes';
import {AuthService} from '../shared/auth.service';
import {AppService} from '../shared/app.service';
import {AppUrls} from '../shared/app.constants';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [FilterArray]
})
export class NavbarComponent implements OnInit, AfterViewInit {
  searchForBook: string;
  showVar: boolean;
  userInfo: any = {email: null};
  myCart: any = [];
  @ViewChild('cart', {read: ElementRef}) cart: ElementRef;
  constructor(private route: Router,
              public authService: AuthService,
              private appService: AppService,
              private appUrls: AppUrls) {
    this.showVar = false;
  }
  searchBooks(searchText, cat, author, event?: any) {
    if (!event || event.keyCode === 13) {
      this.route.navigate(['/search'], {queryParams: {q: searchText, author: author, category: cat}});
      this.searchForBook = '';
    }
  }
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      // check user is logged in or not from the server
      const token = this.authService.getToken('access_token');
      this.appService.get(this.appUrls.me, {login_token: token}).then((data) => {
        console.log(data);
        this.appService.updateUser(data['data']);
      }).catch((err: HttpErrorResponse) => {
        this.logout();
      });
      this.getUser();
      this.appService.cartCast.subscribe((data) => {
        console.log('myCast data', data);
        this.myCart = data;
      }, (error) => {
        console.log(error);
      });
      this.getCartValues();
    }
  }
  ngAfterViewInit() {}
  getUser() {
    this.userInfo = this.authService.getUser();
  }
  logout() {
    const lToken = this.authService.getToken('access_token');
    this.appService.get(this.appUrls.logout, {login_token: lToken})
      .then((data) => {
      })
      .catch((err: HttpErrorResponse) => {
      });
    this.authService.removeToken();
    this.route.navigate(['/welcome']);
    this.appService.updateUser({});
    this.appService.updateCart([]);
    this.appService.toast('Successfully logged out', '', 's');
  }
  getCartValues() {
    if (this.authService.isAuthenticated()) {
      const myQuery = {
        where: {user_id: this.userInfo['_id']},
        embedded: {book: 1}
      };
      this.appService.get(this.appUrls.cart, myQuery).then((data) => {
        console.log('Cart items: ', data['_items']);
        this.myCart = data['_items'];
        this.appService.updateCart(this.myCart);
      });
    }
  }
}

