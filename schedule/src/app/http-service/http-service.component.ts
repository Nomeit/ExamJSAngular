import { Component, OnInit } from '@angular/core';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-http-service',
  templateUrl: './http-service.component.html',
  styleUrls: ['./http-service.component.css']
})
export class HttpServiceComponent{
    num1: number = 0;
    num2: number = 0;
    sum: number  = 0;
    done: boolean = false;

    constructor(private http: HttpClient){ }
      
    getSum(num1: number, num2: number){
        return this.http.get('http://localhost:3000/sum?num1=' + num1 + "&num2=" + num2);
    }
    submit(){
        this.getSum(this.num1, this.num2).subscribe((data:any) => {
            this.sum=data.result; 
            this.done=true;
        });
    }
}
