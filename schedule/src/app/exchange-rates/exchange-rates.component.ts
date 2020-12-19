import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.css']
})
export class ExchangeRatesComponent implements OnInit {

  date: string = '01.12.2014';
  url: string = 'https://api.privatbank.ua/p24api/exchange_rates';
  dataArray = [];

  constructor(private http: HttpClient){}

  getData() {
    this.http.get(`${this.url}?json&date=${this.date}`).subscribe((data) => {
      this.dataArray = data;
      console.log({data});
    });
  }

  getNewData() {
    this.getData();
  }

  ngOnInit(): void {
    this.getData();
  }

}
