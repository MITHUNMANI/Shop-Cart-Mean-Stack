import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, Subject, BehaviorSubject } from 'rxjs';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
declare var jQuery: any;
   
declare var $: any;
@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.css']
})
export class ListproductsComponent implements OnInit, OnDestroy {

  mySubscription : Subscription;

  paramSubscription : Subscription;

  products : any[] = [];

  // show:boolean = false;
  hide:boolean = true;
  loading:boolean = true;


   
   constructor(public pdtSer : ProductsService, public aRoute : ActivatedRoute,public myRoute: Router ) { 
     
   } 
 
  //  showele(){
  //    this.show = !this.show;
  //    var label = $(".btn").text().trim();
  //    if (label === "Hide"){
  //     $(".btn").text("Show");
  //     console.log("show");
  //    }
  //       else{
  //       $(".btn").text("Hide");
  //       console.log("hide");

  //       }
  //         }

        
  ngOnInit(): void {

     this.paramSubscription = this.aRoute.params.subscribe((param:Params)=>{
      // console.log(param.catId);
      if(param.catId){
        this.loading = true;
      this.pdtSer.getProductsByCatwise(param.catId).subscribe((data:any)=>{
        // console.log(data);
        this.loading = false;
        this.products = data;
        // this.hide = true;
      },(error:any)=>{
        console.log(error);
      })
    }
    else{
      this.pdtSer.getAllProducts().subscribe((data:any)=>{
        // console.log(data);
        this.products = data;
        this.loading = false;
        // this.hide = true;
      },
      (error:any)=>{
        console.log(error);
      });
    }
    })
  }
  viewpdt(pdtcatId:any, pdtId:any){
    this.myRoute.navigateByUrl('/view/'+pdtcatId+'/'+pdtId);
    console.log(pdtcatId);
    console.log(pdtId);
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
  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}

// var nsubject = new BehaviorSubject('a');
// nsubject.next('b');
// nsubject.subscribe(value =>{
//   console.log('a',value);
// })
// nsubject.next('c');

   //   var subject = new Subject();
        //   subject.next('hello');
        //   subject.subscribe((data:any)=>{
        //     console.log(data);
        
        //   })
        // subject.next('hi');
      

   /* const simpleObservable = new Observable((observer)=>{

      var i = 1;
      setInterval(()=>{

       // console.log(i);
        observer.next(i);

        if(i==10)
        {
         // observer.error("i value reached 10");

         //observer.complete();
        }

        i++;

      }, 1000); 

    });

    this.mySubscription =  simpleObservable.subscribe((data:any)=>{

        console.log("data "+data);

      }, (error:any)=>{

        console.log(error);

      }, ()=>{

        console.log("Completed");

      });*/

    /*  var subject = new BehaviorSubject("Good Evening");

      subject.next("hello");

      subject.subscribe((data:string)=>{

        console.log(data);

      });

      subject.next("hi");
      subject.next("welcome");

      console.log(subject.value); */


  