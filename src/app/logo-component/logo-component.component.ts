import { Component, OnInit } from '@angular/core'
import { TimerService } from '../timer.service'
import { Subscription } from 'rxjs'
import { QuestionDataService } from '../question-data.service'
import { QuestionTypesService } from '../question-types.service'
import { QuestionAndAnswerService } from '../question-and-answer.service'
import { PlayersService } from '../players.service'
import { randomFromArray } from '../../common/randomize.helper'

@Component({
  selector: 'app-logo-component',
  templateUrl: './logo-component.component.html',
  styleUrls: ['./logo-component.component.css'],
  providers: [TimerService],
})
export class LogoComponentComponent implements OnInit {
  private subscription: Subscription | any
  public randomLogo = ''
  public isVisible = false
  public answer = ''
  public sizes = [-50, -100, -150, -200, -250, -300, -350, -400, -450, -500]
  public size1 = -50
  public size2 = -50

  constructor(
    public questionDataService: QuestionDataService,
    public questionTypeService: QuestionTypesService,
    public questionAnswerService: QuestionAndAnswerService,
    public playerService: PlayersService,
    public timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.init()
  }

  init(): void {
    this.subscription = this.timerService.getBoolean().subscribe((x) => {
      if (x) {
        this.isVisible = true
      }
    })
    this.randomLogo = this.questionDataService.getLogoQuestion()
    this.setSize()
    this.timerService.setTimer(0.5)
  }

  close(): void {
    this.isVisible = false
    this.answer = ''
    this.playerService.nextPlayer()
    this.questionTypeService.setActiveCategory(-1)
  }

  showAnswer(): void {
    this.isVisible = !this.isVisible
    this.subscription.unsubscribe()
    this.timerService.resetTimeout()
    this.questionAnswerService.setWinner(this.playerService.actualPlayer)
    this.questionAnswerService.setPointsForQuestion(2)
  }

  setSize(): void {
    this.size1 = randomFromArray(this.sizes)
    this.size2 = randomFromArray(this.sizes)
  }
}
