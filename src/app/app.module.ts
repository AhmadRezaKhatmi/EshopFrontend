import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SiteHeaderComponent} from './SharedComponents/site-header/site-header.component';
import {SiteFooterComponent} from './SharedComponents/site-footer/site-footer.component';
import {IndexComponent} from './pages/index/index.component';
import {SliderComponent} from './pages/index/slider/slider.component';
import {SpecialProductsComponent} from './pages/index/special-products/special-products.component';
import {NewProductsComponent} from './pages/index/new-products/new-products.component';
import {FavoriteProductsComponent} from './pages/index/favorite-products/favorite-products.component';
import {LatestNewsComponent} from './pages/index/latest-news/latest-news.component';
import {BrandsComponent} from './pages/index/brands/brands.component';
import {SliderService} from './services/slider.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AboutUsComponent} from './pages/about-us/about-us.component';
import {ContactUsComponent} from './pages/contact-us/contact-us.component';
import {AppRoutingModule} from './app-routing.module';
import {EshopInterceptor} from './Utilities/EshopInterceptor';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    IndexComponent,
    SliderComponent,
    SpecialProductsComponent,
    NewProductsComponent,
    FavoriteProductsComponent,
    LatestNewsComponent,
    BrandsComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    SliderService,
    CookieService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EshopInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
