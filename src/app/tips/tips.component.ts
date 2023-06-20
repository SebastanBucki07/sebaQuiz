import { Component, OnInit } from '@angular/core'
import { TipsModel } from '../model/tips-model'
import { QuestionDataService } from '../question-data.service'
import { PlayersService } from '../players.service'
import { TimerService } from '../timer.service'
import { QuestionTypesService } from '../question-types.service'
import { QuestionAndAnswerService } from '../question-and-answer.service'

@Component({
  template: '',
})
export class TipsComponent {
  protected random1: TipsModel | any = {}
  protected question = ''
  protected hasTip3 = true
  protected category = ''
  protected tip = ''
  protected tip2 = ''
  protected tip3 = ''

  constructor(
    private questionDataService: QuestionDataService,
    private questionTypeService: QuestionTypesService,
    private questionAnswerService: QuestionAndAnswerService,
    public timerService: TimerService,
    protected playerService: PlayersService
  ) {}

  init(): void {
    this.getQuestion()
  }

  getQuestion(): void {
    switch (this.category) {
      case 'moviesHero': {
        this.random1 = this.questionDataService.getMoviesHeroQuestion()
        this.question = 'W jakim filmie byli ci bohaterowie:?'
        this.questionAnswerService.setPointsForQuestion(2)
        break
      }
      case 'serialsHero': {
        this.random1 = this.questionDataService.getSerialsHeroQuestion()
        this.question = 'W jakim serialu byli ci bohaterowie:?'
        this.questionAnswerService.setPointsForQuestion(2)
        break
      }
      case 'directors': {
        this.random1 = this.questionDataService.getDirectorsQuestion()
        this.question = 'Kto wyreżyserował?'
        this.questionAnswerService.setPointsForQuestion(4)
        break
      }
      default: {
        break
      }
    }
    this.timerService.setTimer(0.5)
    this.tip = this.random1.Tip1
    this.tip2 = this.random1.Tip2
    this.tip3 = this.random1.Tip3
    if (this.tip3 === '-') {
      this.hasTip3 = false
    }
    this.questionAnswerService.setAnswer(this.random1.Answer)
  }

  close(): void {
    this.hasTip3 = true
    this.playerService.nextPlayer()
    this.questionTypeService.setActiveCategory(-1)
  }
}

@Component({
  selector: 'app-movies-hero',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css'],
  providers: [TimerService],
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
  styleUrls: ['./tips.component.css'],
  providers: [TimerService],
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
  styleUrls: ['./tips.component.css'],
  providers: [TimerService],
})
export class DirectorsComponent extends TipsComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'directors'
    this.init()
  }
}
