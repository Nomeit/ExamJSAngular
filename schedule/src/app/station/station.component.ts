import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute){
    this.id = activateRoute.snapshot.params['id'];
  }

    name: string;
    id: number;
    routs: string = [];
    keys: object;
    editUrl: string;
    ngOnInit(){

      this.http.get(`http://localhost:3200/api/station/${this.id}`).subscribe((data) => {
        this.http.get('http://localhost:3200/api/rout').subscribe((dataR) => {
          this.keys = Object.keys(dataR);
          let tmpRouts = Object.keys(dataR).map(key => (dataR[key]));
          let lich = 0;
          for (let i = 0; i < tmpRouts.length; i++){
            for (let j = 0; j < tmpRouts[i].waybill.length; j++){
              if (this.id == tmpRouts[i].waybill[j][0]){
                this.routs[lich++] = tmpRouts[i].name;
              }
            }
          }
        });
        this.editUrl = `edit`;
        this.name = data.name;
    });
  }
}
