import { Component, OnInit } from '@angular/core'
import { TimerService } from '../timer.service'
import { QuestionAndAnswerService } from '../question-and-answer.service'
import { Subscription } from 'rxjs'
import { PlayersService } from '../players.service'

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
})
export class AnswerComponent implements OnInit {
  protected answer = ''
  protected isAnswerDisplayed = false
  protected isAnswerButtonVisible = true
  protected timeout = false
  private subscription: Subscription

  constructor(
    protected playerService: PlayersService,
    protected timerService: TimerService,
    protected questionAnswerService: QuestionAndAnswerService
  ) {
    this.subscription = this.timerService.getBooleean().subscribe((x) => {
      if (x) {
        this.timerService.timeout = true
        this.timeout = true
        this.setIsDisplayed(true)
        this.setAnswerButtonVisible(false)
      }
    })
  }

  ngOnInit(): void {
    this.setAnswer()
    this.questionAnswerService.setWinner(this.playerService.actualPlayer)
    this.setQuestion()
    this.timerService.setTimer(0.1)
  }

  setAnswer(): void {
    this.answer = this.questionAnswerService.getAnswer()
  }

  setQuestion(): void {
    this.answer = this.questionAnswerService.getAnswer()
  }

  setIsDisplayed(displayed: boolean): void {
    this.isAnswerDisplayed = displayed
  }

  setAnswerButtonVisible(displayed: boolean): void {
    this.isAnswerButtonVisible = displayed
    if (!displayed) {
      this.subscription.unsubscribe()
      this.timerService.resetTimeout()
    }
  }
}
