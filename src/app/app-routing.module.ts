import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ListproductsComponent } from './Products/listproducts/listproducts.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { SingleComponent } from './single/single.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ContactComponent } from './contact/contact.component';
import { NotfoundComponent } from './notfound/notfound.component';



const routes: Routes = [
  { path: '', component: ListproductsComponent },
  { path: 'login', component: LoginComponent },
  {path: 'Categories', redirectTo:'', pathMatch:'full'},
  {path:'Categories/:catId', component:ListproductsComponent},
  {path:'about', component: AboutUsComponent},
  {path:'faqs', component:FaqComponent},
  {path: 'view', redirectTo:'', pathMatch:'full'},
  {path: 'view/:pdtcatid/:pdtid', component: SingleComponent},
  {path:'privacy', component: PrivacyComponent},
  {path:'mail', component: ContactComponent},
  {path:'auth', loadChildren:()=> import('./auth/auth.module').then(m => m.AuthModule)},
  {path: '**', component: NotfoundComponent }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
