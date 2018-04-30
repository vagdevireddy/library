import {Component, OnInit} from '@angular/core';
import {AppService} from '../shared/app.service';
import {AppUrls} from '../shared/app.constants';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../shared/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userInfo: any = {};
  constructor(private appService: AppService,
              private router: Router,
              private appUrls: AppUrls,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login-now']);
    }
  }
}

