import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { QueryValueType } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService { 

  // updateCart = new EventEmitter();
  updateCart = new Subject();

  constructor(public http : HttpClient) { }

  getAllProducts()
  {
   
   return this.http.get("http://localhost:3000/listproducts");
  }
  

  getMyCartItems()
  {
   /* var queryParams = new HttpParams();
    queryParams = queryParams.append("name", "gopi");
    queryParams = queryParams.append("page", "1");

    return this.http.get("http://localhost:3000/mycart", {
      headers : new HttpHeaders({
        'myauthkey' : "myheaders here"
      }),
      params : queryParams
    });*/

    return this.http.get("http://localhost:3000/mycart");
  }

  getCategories(){

    return this.http.get("http://localhost:3000/Categories");
  }

  addproducts(data:any)
  {
    return this.http.post("http://localhost:3000/addproduct", data);
  }
 
  viewpdts(pdtcatid:string,pdtId:string ){
    var queryParams = new HttpParams();
    queryParams = queryParams.append('pdtcatid',pdtcatid);
    queryParams = queryParams.append('pdtId', pdtId);
    return this.http.get('https://localhost:3000/view/',{params:queryParams});
  }
  
  getProductsByCatwise(catId:string){
    return this.http.get('http://localhost:3000/pdtcatwise/'+catId);
  }
  
  addToMyCartItems(cartPdtId: number, cartPdtPrice: number){
    return this.http.post('http://localhost:3000/addtocart',{cartPdtId : cartPdtId, cartPdtPrice : cartPdtPrice});
  }

  getMyCartCount(){
   return this.http.get('http://localhost:3000/cartcount');
  }
  updateMyCartItems(cartId:number, cartQty:number,  pdtPrice:number){
    
    return this.http.put('http://localhost:3000/updatecart',{cartId: cartId,cartQty:cartQty,pdtPrice:pdtPrice});
  }
  removeMyCartItem(cartId:number){
    return this.http.delete("http://localhost:3000/removecart/"+cartId);
   }
}
