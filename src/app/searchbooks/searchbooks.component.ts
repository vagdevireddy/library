import { Component, OnInit } from '@angular/core';
import {AppConstants, AppUrls} from '../shared/app.constants';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AppService} from '../shared/app.service';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-searchbooks',
  templateUrl: './searchbooks.component.html',
  styleUrls: ['./searchbooks.component.css']
})
export class SearchbooksComponent implements OnInit {
  public books = [];
  public queryParams: any = {};
  constructor(private activatedRoute: ActivatedRoute,
              public appConstants: AppConstants,
              private appUrls: AppUrls,
              private appService: AppService,
              private authService: AuthService,
              private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      const where = {};
      if (params['category']) {
        where['book_categories'] = {'$in': [params['category']]};
      }
      where['book_title'] = {$regex: '.*' + params['q'] + '.*', '$options': 'i'};
      const myQuery = {
        where: where
      };
      this.appService.get(this.appUrls.search_books, myQuery).then((data: any) => {
        this.books = [];
        console.log(data);
        const items = data['_items'];
        items.forEach((book) => {
          book['image_thumbnail'] = this.appService.checkHttps(book['image_thumbnail']);
          book['image_small_thumbnail'] = this.appService.checkHttps(book['image_small_thumbnail']);
          book['book_url'] = book['book_title'].replace(/\//g, '').replace(/ /g, '-');
          this.books.push(book);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  ngOnInit() {}
  requestCopy(id, type) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login-now']);
    } else {
      this.router.navigate(['/checkout/' + id], {queryParams: {type: type}});
    }
  }
}
