import { Component, OnInit } from '@angular/core';
import {TipsModel} from "../model/tips-model";
import {QuestionDataService} from "../question-data.service";
import {PlayersService} from "../players.service";
import {TimerService} from "../timer.service";


@Component({
  template: ''
})
export class TipsComponent {
  public random1: TipsModel | any = {}
  public points: number = 2
  public question: string = ''
  public isVisible = false;
  public isModalVisible = false;
  public hasTip3 = true
  public category = ''
  public tip: string = ''
  public tip2: string = ''
  public tip3: string = ''
  public answer: string = ''

  constructor(
    private questionDataService: QuestionDataService,
    private timerService: TimerService,
    public playerService: PlayersService
  ) {
  }

  init(){
    this.getQuestion()
  }


  getQuestion() {
    switch (this.category) {
      case 'moviesHero': {
        this.random1 = this.questionDataService.getMoviesHeroQuestion()
        this.question = 'W jakim filmie byli ci bohaterowie:?'
        this.points = 2
        break
      }
      case 'serialsHero': {
        this.random1 = this.questionDataService.getSerialsHeroQuestion()
        this.question = 'W jakim serialu byli ci bohaterowie:?'
        this.points = 2
        break
      }
      case 'directors': {
        this.random1 = this.questionDataService.getDirectorsQuestion()
        this.question = 'Kto wyreżyserował?'
        this.points = 4
        break
      }
      default: {
        break;
      }
    }
    this.timerService.setTimer(1)
    this.tip = this.random1.Tip1
    this.tip2 = this.random1.Tip2
    this.tip3 = this.random1.Tip3
    if (this.tip3 === "-"){
      this.hasTip3 = false
    }
    this.answer = this.random1.Answer
    this.isModalVisible = true;
  }

  close() {
    this.isVisible = false;
    this.question = ''
    this.answer = ''
    this.hasTip3 = true
    this.playerService.nextPlayer()
    this.init()
    this.playerService.setModal(false)
  }

  showAnswer() {
    this.isVisible = !this.isVisible;
  }
}
@Component({
  selector: 'app-movies-hero',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class MoviesHeroComponent extends TipsComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'moviesHero'
    this.init()
  }
}
@Component({
  selector: 'app-serials-hero',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class SerialsHeroComponent extends TipsComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'serialsHero'
    this.init()
  }
}
@Component({
  selector: 'app-directors',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class DirectorsComponent extends TipsComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'directors'
    this.init()
  }
}
