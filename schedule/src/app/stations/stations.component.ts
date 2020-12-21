import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {

  constructor(private http: HttpClient){}
 
  stations: object = [];
  keys: string[] = [];
  id: number;
  ngOnInit() {
  	this.http.get('http://localhost:3200/api/station').subscribe((data) => {
        this.stations = Object.keys(data).map(key => (data[key]));
        this.keys = Object.keys(data);
        console.log({data});
      });
  }
  delete(id: number){
    this.id = id;
    this.http.delete(`http://localhost:3200/api/station/${this.id}`)
              .subscribe(
                (data: number) => { this.id; },
                  error => console.log(error)
              );
  }
}
