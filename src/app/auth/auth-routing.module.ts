import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MycartComponent } from '../mycart/mycart.component';
import { AddproductsComponent } from '../Products/addproducts/addproducts.component';
import { AuthGuard } from '../auth.guard';


const routes: Routes = [
{path:'', children :[
  { path: 'mycart', component: MycartComponent, canActivate:[AuthGuard] },
  {path: 'addproducts', component: AddproductsComponent},
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
