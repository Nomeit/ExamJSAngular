import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-rout',
  templateUrl: './rout.component.html',
  styleUrls: ['./rout.component.css']
})
export class RoutComponent implements OnInit {

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute){
    this.id = activateRoute.snapshot.params['id'];
  }

    name: string;
    id: number;
    stations: object = [];
    timeLich: string = [];
    tmp_timeL: string = [];
    time: string = "06:00";
    time_tmp = "06:000";
    startTime: string = [];
    ngOnInit(){

      this.http.get(`http://localhost:3200/api/rout/${this.id}`).subscribe((data) => {
        this.name = data.name;
        this.startTime = data.startTime;
        this.http.get(`http://localhost:3200/api/station`).subscribe((dataS) => {
          let stations = dataS;
          for (let i = 0; i < data.waybill.length; i++)
          {
            this.stations[i] = stations[data.waybill[i][0]];
            this.timeLich[i] = data.waybill[i][1];
            this.tmp_timeL[i] = data.waybill[i][1];
          }
        });
        console.log({data});
      });
  }

  findTime(time){
    const newTime = this.time.split(":");
    const id = event.target.dataset.id;
    let times = {}
    for(let i = 0; i < this.startTime.length; i++)
    {
      times[i] = this.startTime[i].split(":");
    }
    for(let i = 0; i < this.startTime.length; i++)
    {
      if (newTime[0] == times[i][0] && newTime[1] == times[i][1])
        return time;
      else
      {
        let h1 = parseInt(newTime[0]);
        let m1 = parseInt(newTime[1]);
        let h2 = parseInt(times[i][0]);
        let m2 = parseInt(times[i][1]);
        if (h1 == h2)
          if (m2 > m1)
            return `${(h2 < 10) ? `0${h2}` : h2}:${(m2 < 10) ? `0${m2}` : m2}`;
        if (h1 < h2)
          return `${(h2 < 10) ? `0${h2}` : h2}:${(m2 < 10) ? `0${m2}` : m2}`;
      }
    }
  }

  setTime(){
    if (this.time != this.time_tmp)
    {
      this.time = this.findTime(this.time);
      let t = this.time.split(":");
      let hours = parseInt(t[0]);
      let minutes = parseInt(t[1]);
      for (let i = 1; i < this.timeLich.length;i++)
      {
        if ((minutes + parseInt(this.tmp_timeL[i]) - parseInt(this.tmp_timeL[i - 1])) > 59)
        {
          minutes = (minutes + parseInt(this.tmp_timeL[i]) - parseInt(this.tmp_timeL[i - 1])) % 60;
          hours++;
          this.timeLich[i] =  `${(hours < 10) ? `0${hours}` : hours}:${(minutes < 10) ? `0${minutes}` : minutes}`;
        }
        else {
          minutes =  parseInt(this.tmp_timeL[i]) - parseInt(this.tmp_timeL[i - 1]) + minutes;
          this.timeLich[i] = `${(hours < 10) ? `0${hours}` : hours}:${(minutes < 10) ? `0${minutes}` : minutes}`;
        }
      }
      this.timeLich[0] = this.time;
      this.time_tmp = this.time;
    }
  }
}
