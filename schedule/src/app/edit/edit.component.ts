import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute){
    this.id = activateRoute.snapshot.params['id'];
  }

  id: number;
  station: string;
  backUrl: string;
  station_tmp: string;
  ngOnInit(): void {
  	this.http.get(`http://localhost:3200/api/station/${this.id}`).subscribe((data) => {
        this.station = data.name;
        this.station_tmp = data.name;
        console.log({data});
      });
  	this.backUrl = `/station/${this.id}`;
  }
  saveEdit(){
  	if (this.station == this.station_tmp)
  	{
  		return;
  	}
  	this.station_tmp = this.station;
  	this.http.put(`http://localhost:3200/api/station/${this.id}/edit`, { id: this.id }).subscribe((data) => {
  			this.station;},
  			error => console.log(error)
  		);
  	console.log(this.station);
  }
}
