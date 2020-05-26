import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  pdtname: string;

  transform(value: any, searchvalue: string): unknown {
    // if (searchvalue === undefined || value.length === 0) {
    //   return value;
    // }
   if(searchvalue === this.pdtname){
      return 
    }
  }

}
