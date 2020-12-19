import { Component } from '@angular/core';
import { NgModel, NgForm} from '@angular/forms';	

export class Phone{
    constructor(public title: string, 
                public price: number, 
                public company: string)
    { }
}


export class User{
    name: string; 
    email: string;
    phone: string;
}


@Component({
  selector: 'app-exapmle',
  templateUrl: './exapmle.component.html',
  styleUrls: ['./exapmle.component.css']
})
export class ExapmleComponent {

   // phone: Phone = new Phone("", 0, "");
   // companies: string[] = ["Apple", "Huawei", "Xiaomi", "Samsung", "LG", "Motorola", "Alcatel"];
     
   //  addPhone(title:NgModel, price: NgModel, comp: NgModel){
   //      console.log(title);
   //      console.log(price);
   //      console.log(comp);
   //  }

    user: User = new User();
    onSubmit(form: NgForm){
        console.log(form);
    }

}
