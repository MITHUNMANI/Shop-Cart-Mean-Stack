import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {

  Categories: any[] = [];
  selectedImg: any;
  msg: string;
  constructor(public pdtSer: ProductsService) { }

  ngOnInit(): void {
    this.pdtSer.getCategories().subscribe(( data:any[])=>{
      this.Categories = data;
      console.log(data);
    },
    (error)=>{
      console.log(error);
    })
  }
  selectImage(event:any){
    this.selectedImg = event.target.files[0];
    console.log(this.selectedImg);


  }
  createProducts(form: NgForm)
{
  var fd = new FormData();
  fd.append("productName", form.value.pdtName);
  fd.append("productcatId", form.value.catId);
  fd.append("productPrice", form.value.pdtPrice);
  fd.append("productDesc", form.value.pdtDesc);
  fd.append("productImg", this.selectedImg, "productImg");
  // console.log(form.value);
  // console.log(form.value.catId);
  this.pdtSer.addproducts(fd).subscribe((data:any)=>{
    // console.log(data);
    this.msg = data;
    form.reset();
  },
  (error)=>{
    console.log(error);
    this.msg = 'something went wrong';
  
  });
}
}

