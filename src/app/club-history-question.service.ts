import { Injectable } from '@angular/core';
import {ClubHistory} from "./model/clubHistory-model";
import clubHistoryData from "../assets/clubs/clubsHistory.json"
import {getAndDeleteRandomElementFromArray} from "../common/randomize.helper";

@Injectable({
  providedIn: 'root'
})
export class ClubHistoryQuestionService {
  public allClubsHistoryQuestion: ClubHistory[] = []
  public init = false
  constructor() {
  }

  initial(){
    this.allClubsHistoryQuestion = clubHistoryData
    this.init = true
  }

  getClubHistoryQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allClubsHistoryQuestion)
  }
}
