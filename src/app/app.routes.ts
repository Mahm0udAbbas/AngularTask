import { Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { LoginComponent } from './components/login/login.component';
import { DetailsComponent } from './components/details/details.component';
import { AdsComponent } from './components/ads/ads.component';
import { authGuard } from './guards/auth.guard';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditComponent } from './components/edit/edit.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'Home', pathMatch: 'full' },
      { path: 'home', component: OrderComponent },
      { path: 'about', component: AboutUsComponent },
      {
        path: 'contact',
        component: ContactUsComponent,
        canActivate: [authGuard],
      },
      { path: 'details/:id', component: DetailsComponent },
      { path: 'offers', component: AdsComponent },
      { path: 'product/add', component: AddProductComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: 'register', component: UserRegisterComponent },
    ],
  },
  { path: 'login', component: LoginComponent },

  { path: '**', component: NotFoundComponent },
];
