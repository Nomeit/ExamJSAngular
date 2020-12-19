import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

class User{
    name: string;
    age: number;
    constructor(name: string, age: number) {
    	this.name = name;
    	this.age = age;
    }
}

@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.css']
})
export class HttpComponent implements OnInit {

  	user: User = {
  		name: '',
  		age: 0,
  	};
 
	constructor(private http: HttpClient){}
	  
	ngOnInit(){
	      
	    this.http.get('assets/user.json').subscribe((data) => {
	    	this.user = data;
	    	console.log({data});
	    });
	}

}
