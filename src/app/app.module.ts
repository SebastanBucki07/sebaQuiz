import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {PlayersComponent} from './players/players.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CategoriesComponent} from './categories/categories.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSortModule} from "@angular/material/sort";
import {BooksComponent, CitiesTipsComponent, SongsComponent, SongTipsComponent} from './fragments/fragments.component';
import {CountryComponent} from './country/country.component';
import {TimerComponent} from './timer/timer.component';
import {ClubHistoryComponent} from './club-history/club-history.component';
import {ClubCrestsComponent} from './club-crests/club-crests.component';
import {
  BiologyComponent, CapitalsComponent,
  ChemistSymbolComponent,
  DistrictsComponent, FootballComponent,
  GamesComponent, GodsComponent, HistoryComponent,
  MoviesComponent, ProverbsComponent,
  SerialsComponent, StadiumsComponent
} from './description/description.component';
import {BuildingsComponent, FamousPeopleComponent, FlaguesComponent} from './photos/photos.component';
import {MoviesActorsComponent, SerialsActorsComponent} from './actors/actors.component';
import {YoutubeMundialComponent, YoutubeSerialsComponent, YoutubeSongComponent} from './youtube/youtube.component';
import {DirectorsComponent, MoviesHeroComponent, SerialsHeroComponent, TipsComponent} from './tips/tips.component';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';
import { BackgroundSoundComponent } from './background-sound/background-sound.component';
import { FamiliadaComponent } from './familiada/familiada.component';
import { FootballGamesComponent } from './football-games/football-games.component';

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
    DistrictsComponent,
    StadiumsComponent,
    ProverbsComponent,
    HistoryComponent,
    FamousPeopleComponent,
    BuildingsComponent,
    SerialsActorsComponent,
    MoviesActorsComponent,
    YoutubeSongComponent,
    YoutubeSerialsComponent,
    ChemistSymbolComponent,
    BiologyComponent,
    GodsComponent,
    SongTipsComponent,
    CitiesTipsComponent,
    TipsComponent,
    MoviesHeroComponent,
    SerialsHeroComponent,
    DirectorsComponent,
    YoutubeMundialComponent,
    FootballComponent,
    MultipleChoiceComponent,
    BackgroundSoundComponent,
    FlaguesComponent,
    CapitalsComponent,
    FamiliadaComponent,
    FootballGamesComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    MatCheckboxModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[
    TimerComponent
  ]
})
export class AppModule {
}
