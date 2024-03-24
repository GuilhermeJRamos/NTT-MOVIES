import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';
import {MatCardModule} from '@angular/material/card'
import { FlexModule } from '@angular/flex-layout';
import { FooterComponent } from './components/footer/footer.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    MovieInfoComponent,
    FooterComponent,
    HomeComponent,
    FavoritesComponent,
    MovieCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    FlexModule,
    MatCardModule,
    StoreModule.forRoot({}, {})
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
