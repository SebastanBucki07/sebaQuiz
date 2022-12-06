import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesComponent } from './categories/categories.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSortModule} from "@angular/material/sort";
import {BooksComponent, SongsComponent} from './fragments/fragments.component';
import { CountryComponent } from './country/country.component';
import { TimerComponent } from './timer/timer.component';
import { ClubHistoryComponent } from './club-history/club-history.component';
import { ClubCrestsComponent } from './club-crests/club-crests.component';
import {
  DistrictsComponent,
  GamesComponent,
  MoviesComponent,
  SerialsComponent
} from './description/description.component';

@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    BooksComponent,
    PlayersComponent,
    CategoriesComponent,
    CountryComponent,
    TimerComponent,
    ClubHistoryComponent,
    ClubCrestsComponent,
    MoviesComponent,
    SerialsComponent,
    GamesComponent,
    DistrictsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    MatCheckboxModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
