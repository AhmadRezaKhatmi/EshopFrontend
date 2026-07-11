import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './pages/index/index.component';
import {ContactUsComponent} from './pages/contact-us/contact-us.component';
import {AboutUsComponent} from './pages/about-us/about-us.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {ActiveAccountComponent} from './pages/active-account/active-account.component';
import {ProductsComponent} from './pages/products/products.component';

const appRoutes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'activate-account/:activeCode', component: ActiveAccountComponent},
  {path: 'products', component: ProductsComponent},
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
