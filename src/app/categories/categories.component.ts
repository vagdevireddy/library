import { Component, OnInit } from '@angular/core';
import {AppService} from '../shared/app.service';
import {AppUrls} from '../shared/app.constants';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any = [];
  constructor(private appService: AppService,
              private appUrls: AppUrls) { }

  ngOnInit() {
    this.getCategories();
  }
  getCategories () {
    this.appService.get(this.appUrls.categories).then((data: any) => {
      console.log(data);
      this.categories = data['_items'];
    }, (err) => {
      console.log(err);
    });
  }

}
