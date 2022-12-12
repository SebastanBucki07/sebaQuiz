import { Component, OnInit } from '@angular/core';
import {ClubHistory} from "../model/clubHistory-model";
import {PlayersService} from "../players.service";
import {QuestionDataService} from "../question-data.service";

@Component({
  selector: 'app-club-history',
  templateUrl: './club-history.component.html',
  styleUrls: ['./club-history.component.css']
})
export class ClubHistoryComponent implements OnInit {
  public isModalVisible = false;
  public random1: ClubHistory | any = {}
  public isVisible = false;
  public answer: string = ''
  public tip: string = ''

  constructor(
    private questionDataService: QuestionDataService,
    public playerService: PlayersService
  ) {
  }

  ngOnInit(): void {
    this.random1 = this.questionDataService.getClubHistoryQuestion()
    this.answer = this.random1.osoba
    this.tip = this.random1.narodowosc
    this.isModalVisible = true;
    console.log('club history')
    console.log(`club history: ${JSON.stringify(this.random1)}`)
  }

  close() {
    this.isVisible = false;
    this.isModalVisible = false
    this.answer = ''
    this.playerService.nextPlayer()
  }

  showAnswer() {
    this.isVisible = !this.isVisible;
  }
}
