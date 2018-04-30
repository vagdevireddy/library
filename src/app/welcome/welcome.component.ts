import { Component, OnInit } from '@angular/core';
import {AppService} from '../shared/app.service';
import {AppUrls} from '../shared/app.constants';
import * as Parse from 'parse';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  booksList: any = [];
  resourceItems: any = [];
  constructor (private appService: AppService, private appUrls: AppUrls) {}
  ngOnInit () {
    this.appService.get(this.appUrls.books_list).then((data: any) => {
      console.log(data);
      const items: any = data['_items'];
      items.forEach((item, index) => {
        item['image_thumbnail'] = this.appService.checkHttps(item['image_thumbnail']);
        item['image_small_thumbnail'] = this.appService.checkHttps(item['image_small_thumbnail']);
        item['book_url'] = item['book_title'].replace(/\//g, '').replace(/ /g, '-');
        if (index <= 9) {
          this.booksList.push(item);
        }
      });
    }, (err) => {});
  }
}
