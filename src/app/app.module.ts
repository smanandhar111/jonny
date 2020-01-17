import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatToolbarModule} from '@angular/material';
import { AuthComponent } from './compos/auth/auth.component';
import {AuthService} from './compos/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
