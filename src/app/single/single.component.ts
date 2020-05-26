import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, Subject, BehaviorSubject } from 'rxjs';
import { ProductsService } from '../Products/products.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  
  mySubscription : Subscription;

  paramSubscription : Subscription;

  products : any[] = [];
  origin: any;
  relate:any;

  hide:boolean = true;
  loading:boolean = true;

  constructor(public pdtSer : ProductsService, public aRoute : ActivatedRoute,public myRoute: Router) { }

  ngOnInit(): void {
   this.aRoute.params.subscribe((param:Params)=>{
     this.pdtSer.viewpdts(param.pdtcatid, param.pdtid).subscribe((data:any[])=>{
   var own = data.filter((obj)=>{
     return obj._id == param.pdtid
   });
   var clone = data.filter((obj)=>{
     return obj._id!= param.pdtid;
   });
   this.origin = own;
   this.relate = clone;
     });
   });
}

viewpdt(pdtcatId:any, pdtId:any){
  this.myRoute.navigateByUrl('/view/'+pdtcatId+'/'+pdtId)
}
viewpdt(){
  this.myRoute.navigate
}
addToCart(cartPdtId: number, cartPdtPrice: number){
  // this.pdtSer.updateCart.next('data emitted');
  this.pdtSer.addToMyCartItems(cartPdtId, cartPdtPrice).subscribe((data:any)=>{
    this.pdtSer.updateCart.next('data emitted');
    console.log(data);

  },
  (error:any)=>{
    console.log(error);
  })
}
  }
  
