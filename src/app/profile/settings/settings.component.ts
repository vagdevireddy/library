import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AppService} from '../../shared/app.service';
import {AppUrls} from '../../shared/app.constants';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public registeredOn: any;
  public user: any;
  public gender: any[];
  public queryParams: {};
  constructor(private appService: AppService,
              private appUrls: AppUrls,
              private activateRoute: ActivatedRoute,
              private authService: AuthService) {
    this.activateRoute.queryParams.subscribe((params: Params) => {
      this.queryParams = params;
    });
  }

  ngOnInit() {
    this.gender = [{title: 'Male', value: 'male'}, {title: 'Female', value: 'female'}];
    this.user = {
      '_id': null,
      'is_active': false,
      'picture': null,
      'age': null,
      'first_name': null,
      'last_name': null,
      'gender': this.gender[0],
      'company': null,
      'email': null,
      'mobile_number': null,
    };
    if (this.authService.isAuthenticated()) {
      this.appService.userCast.subscribe((castUser) => {
        console.log('current User', castUser);
        this.user = castUser;
        this.registeredOn = new Date(castUser['created_date']);
      })
    }
  }
  update(user) {
    delete user['_updated'];
    delete user['modified_date'];
    delete user['created_date'];
    const url = this.appUrls.users + '/' + user['_id'];
    this.appService.patch(url, user).then((data) => {
      console.log('After update ..', data);
      this.appService.toast(user['email'], 'Successfully Updated!', 's');
    }).catch((err) => {
      console.log('Error', err);
      this.appService.toast(user['email'], 'Something went wrong!', 'e');
    });
  }

}
