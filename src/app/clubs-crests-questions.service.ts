import { Injectable } from '@angular/core';
import clubCrestsData from "../assets/clubs/clubCrests.json";
import {getAndDeleteRandomElementFromArray} from "../common/randomize.helper";

@Injectable({
  providedIn: 'root'
})
export class ClubsCrestsQuestionsService {

  public allClubsCrests: string[] = []
  public init = false
  constructor() {
  }

  initial(){
    this.allClubsCrests = clubCrestsData
    this.init = true
  }

  getClubCrestsQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allClubsCrests)
  }
}
