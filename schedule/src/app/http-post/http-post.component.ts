import { Component, OnInit } from '@angular/core';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

class User{
    name: string;
    age: number;
}

@Component({
  selector: 'app-http-post',
  templateUrl: './http-post.component.html',
  styleUrls: ['./http-post.component.css']
})
export class HttpPostComponent{

  constructor(private http: HttpClient){ }
 
  postData(user: User){
        
      const body = {name: user.name, age: user.age};
      return this.http.post('http://localhost:3000/postuser', body); 
  }

  user: User = new User(); // данные вводимого пользователя
    
  receivedUser: User; // полученный пользователь
  done: boolean = false;
  submit(user: User){
      this.postData(user)
              .subscribe(
                  (data: User) => {this.receivedUser=data; this.done=true;},
                  error => console.log(error)
              );
  }

}
