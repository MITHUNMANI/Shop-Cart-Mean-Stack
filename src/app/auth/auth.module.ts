import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { MycartComponent } from '../mycart/mycart.component';
import { AddproductsComponent } from '../Products/addproducts/addproducts.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    MycartComponent,
    AddproductsComponent
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
