import { Routes, CanActivate } from '@angular/router';
import {WelcomeComponent} from '../welcome/welcome.component';
import {BookDetailsComponent} from '../book-details/book-details/book-details.component';
import {SearchbooksComponent} from '../searchbooks/searchbooks.component';
import {CheckoutComponent} from '../checkout/checkout.component';
import {MycreditComponent} from '../mycredit/mycredit.component';
import {RegisterComponent} from '../register/register.component';

import {AuthGuardService as AuthGaurd} from '../shared/auth.service';
import {ProfileComponent} from '../profile/profile.component';
import {MembershipComponent} from '../profile/membership/membership.component';
import {SettingsComponent} from '../profile/settings/settings.component';
import {ShippingComponent} from '../profile/shipping/shipping.component';
import {LoginComponent} from '../login/login.component';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';
import {ChangePasswordComponent} from '../change-password/change-password.component';
import {OrdersComponent} from '../orders/orders.component';
import {OrderSuccessComponent} from '../order-success/order-success.component';
import {WalletComponent} from '../wallet/wallet.component';
import {MycartComponent} from '../mycart/mycart.component';
import {CategoriesComponent} from '../categories/categories.component';

export const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'book_details/:book_name/:isbn', component: BookDetailsComponent},
  {path: 'register-now', component: RegisterComponent},
  {path: 'login-now', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'search', component: SearchbooksComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'mycredit', component: MycreditComponent},
  {path: 'order-success/:order_id', component: OrderSuccessComponent},
  {
    path: 'profile', component: ProfileComponent,
    children: [
      {path: '', redirectTo: 'settings', pathMatch: 'full'},
      {path: 'membership', component: MembershipComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'shipping', component: ShippingComponent},
      {path: 'change-password', component: ChangePasswordComponent},
      {path: 'my-orders', component: OrdersComponent}
    ]
  },
  {path: 'my-cart', component: MycartComponent},
  {path: 'my-wallet', component: WalletComponent},
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  }
];
