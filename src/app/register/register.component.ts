import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../shared/app.service';
import {AppUrls} from '../shared/app.constants';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  rForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    c_password: new FormControl('', [Validators.required]),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    mobile_number: new FormControl('', [Validators.required]),
    gender: new FormControl('male'),
    status: new FormControl('inactive'),
    city: new FormControl(''),
    user_level: new FormControl('user')
  });
  constructor(private appService: AppService,
              private appUrls: AppUrls,
              private router: Router) {}

  ngOnInit() {
  }
  register(user: any, valid: any) {
    console.log(user);
    user['user_level'] = [user['user_level']];
    delete user['c_password'];
    user['email_confirmed'] = true;
    user = [user];
    this.appService.post(this.appUrls.register, user).then((data) => {
      if (data['data'] && data['data'].length) {
        this.appService.toast(user['email'], 'Successfully registered!', 's');
        this.router.navigate(['/welcome']);
      }
    }).catch((err: HttpErrorResponse) => {
      console.log(err, err['error']['_error']);
      this.appService.errorHandling(err);
    });
  }

}
