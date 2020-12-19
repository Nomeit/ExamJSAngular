import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';


interface CurrencyType {
  ccy: string,
  base_ccy: string,
  buy: number,
  sale:number
}



@Component({
  selector: 'app-currency-conversion',
  templateUrl: './currency-conversion.component.html',
  styleUrls: ['./currency-conversion.component.css']
})
export class CurrencyConversionComponent implements OnInit {

  constructor(private http: HttpClient){}

  hideServerError = true;
  inputValue: number = 0;
  outValue: number = 0;
  inputCurrency: string = '';
  outCurrency: string = '';

  dataOutArray: CurrencyType[] = [];
  dataInputArray: CurrencyType[] = [];

  dataArray: CurrencyType[] = [];

  url = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

  calculateOutValue() {
    const buyArr = this.dataArray.filter(item => item.ccy == this.inputCurrency);
    const saleArr = this.dataArray.filter(item => item.ccy == this.outCurrency);

    const { buy } = buyArr[0];
    const { sale } = saleArr[0];

    this.outValue = this.inputValue * buy / sale;
  }

  changeValue(value: string) {
    this.inputValue = parseFloat(value);
    this.calculateOutValue();
  }

  changeCurrency (ccy: string, operation: string) {
    if (operation == 'buy') {
      this.inputCurrency = ccy;
      this.dataInputArray = this.dataArray.filter(item => item.ccy != this.outCurrency);
      this.dataOutArray = this.dataArray.filter(item => item.ccy != this.inputCurrency);
    }

    if (operation == 'sale') {
        this.outCurrency = ccy;
        this.dataInputArray = this.dataArray.filter(item => item.ccy != this.outCurrency);
        this.dataOutArray = this.dataArray.filter(item => item.ccy != this.inputCurrency);
    }

    this.calculateOutValue();

  }

  getUrl(): void {
    this.http.get(this.url).subscribe((data: CurrencyType[]) => {
      this.dataArray = data.filter(item => item.base_ccy == "UAH");

      const { ccy } = data[0];
      const { ccy: outCcy } = data[1];
      this.inputCurrency = ccy;
      this.outCurrency = outCcy;

      this.dataInputArray = this.dataArray.filter(item => item.ccy != this.outCurrency);
      this.dataOutArray = this.dataArray.filter(item => item.ccy != this.inputCurrency);
      this.hideServerError = true;
      console.log({data});
    },
    error => {
      this.hideServerError = false;
      console.log({error});
    }

    );

  }

  ngOnInit(): void {
  	this.getUrl();
  }

  tryAgane () {
    this.url = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
    this.getUrl();
  }

}
