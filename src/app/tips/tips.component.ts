import { Component, OnInit } from '@angular/core'
import { TipsModel } from '../model/tips-model'
import { QuestionDataService } from '../question-data.service'
import { PlayersService } from '../players.service'
import { TimerService } from '../timer.service'
import { Subscription } from 'rxjs'

@Component({
  template: '',
})
export class TipsComponent {
  private subscription: Subscription | any
  public random1: TipsModel | any = {}
  public points = 2
  public question = ''
  public isVisible = false
  public isModalVisible = false
  public hasTip3 = true
  public category = ''
  public tip = ''
  public tip2 = ''
  public tip3 = ''
  public answer = ''

  constructor(
    private questionDataService: QuestionDataService,
    public timerService: TimerService,
    public playerService: PlayersService
  ) {}

  init(): void {
    this.getQuestion()
  }

  getQuestion(): void {
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
        break
      }
    }
    this.subscription = this.timerService.getBooleean().subscribe((x) => {
      if (x) {
        this.isVisible = true
      }
    })
    this.timerService.setTimer(0.5)
    this.tip = this.random1.Tip1
    this.tip2 = this.random1.Tip2
    this.tip3 = this.random1.Tip3
    if (this.tip3 === '-') {
      this.hasTip3 = false
    }
    this.answer = this.random1.Answer
    this.isModalVisible = true
  }

  close(): void {
    this.isVisible = false
    this.question = ''
    this.answer = ''
    this.hasTip3 = true
    this.playerService.nextPlayer()
    this.init()
    this.playerService.setModal(false)
  }

  showAnswer(): void {
    this.isVisible = !this.isVisible
    this.subscription.unsubscribe()
    this.timerService.resetTimeout()
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
