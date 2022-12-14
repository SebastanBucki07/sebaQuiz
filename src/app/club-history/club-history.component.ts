import { Component, OnInit } from '@angular/core';
import {ClubHistory} from "../model/clubHistory-model";
import {PlayersService} from "../players.service";
import {QuestionDataService} from "../question-data.service";
import {TimerService} from "../timer.service";

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
  public photos:any = []

  constructor(
    private questionDataService: QuestionDataService,
    public playerService: PlayersService,
    private timerService: TimerService,
  ) {
  }

  init(){
    this.timerService.setTimer(1)
    this.random1 = this.questionDataService.getClubHistoryQuestion()
    this.answer = this.random1.osoba
    this.tip = this.random1.narodowosc
    if (this.random1.klub1 != '-'){
      this.photos.push(this.random1.klub1)
    }
    if (this.random1.klub2 != '-'){
      this.photos.push(this.random1.klub2)
    }
    if (this.random1.klub3 != '-'){
      this.photos.push(this.random1.klub3)
    }
    if (this.random1.klub4 != '-'){
      this.photos.push(this.random1.klub4)
    }
    if (this.random1.klub5 != '-'){
      this.photos.push(this.random1.klub5)
    }
    this.isModalVisible = true;
  }

  ngOnInit(): void {
    this.init();
  }

  close() {
    this.isVisible = false;
    this.answer = ''
    this.photos = []
    this.playerService.nextPlayer()
    this.init()
    this.playerService.setModal(false);
  }

  showAnswer() {
    this.isVisible = !this.isVisible;
  }
}
