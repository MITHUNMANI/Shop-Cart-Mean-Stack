import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Products/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {

  myCartItems : any[] = [];
  loading: any = true;
  myCartFinalPrice: number;
  msg: string;
  constructor(public pdtSer: ProductsService,  public myRoute: Router) { }

  ngOnInit(): void {
    this.pdtSer.getMyCartItems().subscribe((data:any[])=>{
      // console.log(data);
      this.loading = false;
      this.myCartItems = data;
      this.myCartFinalPrice = 0;    
      for(var index in this.myCartItems){
        this.myCartFinalPrice += this.myCartItems[index].cartPdtPrice;
      }
    }, (error)=>{
      if (error.status == 401){
        localStorage.clear();
        this.myRoute.navigateByUrl('/login');
      }
      console.log(error);
    })
  }
  updateMyCart(cartId:number, cartQty:number,  pdtPrice:number){
    // console.log(cartId);
    this.pdtSer.updateMyCartItems(cartId, cartQty, pdtPrice).subscribe((data:any)=>{
      // console.log(data);   
      this.msg = data ;
      var index = this.myCartItems.findIndex((obj)=>{
        
        return obj._id === cartId ;
      });
      this.myCartItems[index].cartQty = cartQty;
      this.myCartItems[index].cartPdtPrice = cartQty*pdtPrice;
      this.myCartFinalPrice = 0;    
      for(var ind in this.myCartItems){
        this.myCartFinalPrice += this.myCartItems[ind].cartPdtPrice;
      }
    },
    (error:any)=>{
    // console.log(error);
    this.msg = error;
    });
}
removeCartItem(cartId:number){
  this.pdtSer.removeMyCartItem(cartId).subscribe((data:any)=>{
    this.msg = data;
    this.myCartItems = this.myCartItems.filter((obj)=>{
     return obj._id != cartId;
    });
    this.pdtSer.updateCart.next('data emitted');
    this.myCartFinalPrice = 0;    
    for(var index in this.myCartItems){
      this.myCartFinalPrice += this.myCartItems[index].cartPdtPrice;
    }
  },
  (error:any)=>{
    this.msg = error;
  })
}
}


