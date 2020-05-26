import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from '../login/loginservice.service';
import { Router } from '@angular/router';
import { ProductsService } from '../Products/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartitems: number;
  value: any;
  tempArray: [];

  constructor(public loginUser: LoginserviceService, public myRoute: Router, public pdtSer: ProductsService) { }

  ngOnInit(): void {
    
    this.getCartCount();

    this.pdtSer.updateCart.subscribe((data:any)=>{
      // console.log(data);
     // this.cartitems++;
     this.getCartCount();

    
    });
    // console.log(this.loginUser.isLoggedIn());
  }


  
  showbyname(value:any){
    this.pdtSer.getAllProducts().subscribe((data:any)=>{
      // console.log(data[0].productName);
     
      // for (var i = 0, len = data.length;  i<len; i++){
      //   if(data[i].productName === value){
      //     // return i;
      //     console.log(i);
      //   }
      // }
    
    })
  }


  dologout() {
    this.cartitems = 0;
    localStorage.clear();
    this.myRoute.navigateByUrl('/login');
  }

  getCartCount(){
    this.pdtSer.getMyCartCount().subscribe((cartCount:number)=>{
      this.cartitems = cartCount;
      // console.log(cartCount);
     });
    }
}
