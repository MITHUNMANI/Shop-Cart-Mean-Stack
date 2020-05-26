import { LoginserviceService } from './loginservice.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../Products/products.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formData = { username: '', password: '', email: '', phone: '' };
  msg: string;
  constructor(public loginUser: LoginserviceService, public myRoute: Router, public pdtSer: ProductsService) {
  }
  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });

    $('.toggle').click(function () {
      // Switches the Icon
      $(this).children('i').toggleClass('fa-pencil');
      // Switches the forms
      $('.form').animate({
        height: 'toggle',
        'padding-top': 'toggle',
        'padding-bottom': 'toggle',
        opacity: 'toggle'
      }, 'slow');
    });
  }

  doLogin() {
    this.loginUser.userLogin(this.loginForm.value).subscribe((data: string) => {
      if (data.length == 0) {
        this.msg = 'Invalid login';
      } else {
        localStorage.setItem('token', data);
        this.pdtSer.updateCart.next('data emitted');
        this.myRoute.navigateByUrl('/');
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  get usernameCtrl() {
    return this.loginForm.get('username');
  }
  doReg(form: NgForm) {
    this.formData.username = form.value.name;
    this.formData.password = form.value.password;
    this.formData.email = form.value.email;
    this.formData.phone = form.value.phone;
    this.loginUser.userRegistration(this.formData).subscribe((data: any) => {
      this.msg = data;
    }, (error: any) => {
      console.log(error);
    });
    // form.reset();
  }
}

