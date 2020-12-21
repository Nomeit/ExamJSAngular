import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { ExapmleComponent } from './exapmle/exapmle.component';
import { HttpComponent } from './http/http.component';
import { CurrencyConversionComponent } from './currency-conversion/currency-conversion.component';
import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component';
import { HttpServiceComponent } from './http-service/http-service.component';
import { HttpPostComponent } from './http-post/http-post.component';
import { StationComponent } from './station/station.component';
import { StationsComponent } from './stations/stations.component';
import { RoutComponent } from './rout/rout.component';
import { RoutsComponent } from './routs/routs.component';
import { HomePageComponent } from './home-page/home-page.component';

const appRoutes: Routes =[
    { path: 'rout', component: RoutsComponent},
    { path: 'station', component: StationsComponent},
    { path: '', component: HomePageComponent },
    { path: 'rout/:id', component: RoutComponent},
    { path: 'station/:id', component: StationComponent},
    { path: 'station/:id/edit', component: StationComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    // ExapmleComponent,
    HttpComponent,
    CurrencyConversionComponent,
    ExchangeRatesComponent,
    HttpServiceComponent,
    HttpPostComponent,
    StationComponent,
    StationsComponent,
    RoutComponent,
    RoutsComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
