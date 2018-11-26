import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SearchComponent } from './component/search/search.component';
import {HttpClientModule} from '@angular/common/http';
import { SpinnerComponent } from './component/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
