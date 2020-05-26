import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }
