import {Injectable} from '@angular/core';
import {ActorModel} from "./model/actor-model";
import moviesData from "../assets/actors/movieActors.json";
import serialsData from "../assets/actors/serialActors.json";
import {getAndDeleteRandomElementFromArray} from "../common/randomize.helper";

@Injectable({
  providedIn: 'root'
})
export class ActorsQuestionService {
  public allMoviesActors: ActorModel[] = []
  public allSerialsActors: ActorModel[] = []
  public init = false

  constructor() {
  }

  initial() {
    this.allMoviesActors = moviesData
    this.allSerialsActors = serialsData
    this.init = true
  }

  getSerialsActorsQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allSerialsActors)
  }

  getMoviesActorsQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allMoviesActors)
  }
}
