import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {AppComponent} from './app.component';
import { routes } from './config/app.routes';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BookDetailsComponent } from './book-details/book-details/book-details.component';
import { SearchbooksComponent } from './searchbooks/searchbooks.component';
import {AppService} from './shared/app.service';
import {AppConstants, AppUrls} from './shared/app.constants';
import {FilterArray} from './shared/app.pipes';
import { CheckoutComponent } from './checkout/checkout.component';
import { MycreditComponent } from './mycredit/mycredit.component';
import {AuthGuardService, AuthService} from './shared/auth.service';
import { RegisterComponent } from './register/register.component';
import { MembershipComponent } from './profile/membership/membership.component';
import { SettingsComponent } from './profile/settings/settings.component';
import { ShippingComponent } from './profile/shipping/shipping.component';
import {ProfileComponent} from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentComponent } from './payment/payment.component';
import { WalletComponent } from './wallet/wallet.component';
import { MycartComponent } from './mycart/mycart.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavbarComponent,
    FooterComponent,
    BookDetailsComponent,
    SearchbooksComponent,
    FilterArray,
    CheckoutComponent,
    MycreditComponent,
    RegisterComponent,
    ProfileComponent,
    MembershipComponent,
    SettingsComponent,
    ShippingComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    OrderSuccessComponent,
    OrdersComponent,
    PaymentComponent,
    WalletComponent,
    MycartComponent,
    CategoriesComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule.withServerTransition({appId: 'universal-cli'}),
    RouterModule.forRoot(routes)
  ],
  providers: [AppService, AppUrls, AppConstants, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
