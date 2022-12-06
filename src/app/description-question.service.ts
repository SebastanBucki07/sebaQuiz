import {Injectable} from '@angular/core';
import {DescriptionModel} from "./model/description-model";
import moviesData from "../assets/movies/movies.json";
import serialsData from "../assets/movies/serials.json";
import gamesData from "../assets/games/games.json";
import allDistricts from "../assets/poland/citiesPL.json";
import {getAndDeleteRandomElementFromArray} from "../common/randomize.helper";

@Injectable({
  providedIn: 'root'
})
export class DescriptionQuestionService {
  public allMovies: DescriptionModel[] = []
  public allSerials: DescriptionModel[] = []
  public allGames: DescriptionModel[] = []
  public allDisctricts: DescriptionModel[] = []
  public init = false

  constructor() {
  }

  initial(){
    this.allMovies = moviesData
    this.allSerials = serialsData
    this.allGames = gamesData
    this.allDisctricts = allDistricts
    this.init = true
  }

  getMoviesDescriptionQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allMovies)
  }

  getSerialsDescriptionQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allSerials)
  }

  getGamesDescriptionQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allGames)
  }

  getDistrictsDescriptionQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allDisctricts)
  }
}
