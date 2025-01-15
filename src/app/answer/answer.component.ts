import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
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
  private subscription2!: Subscription

  constructor(
    private cdr: ChangeDetectorRef,
    protected playerService: PlayersService,
    protected timerService: TimerService,
    protected questionAnswerService: QuestionAndAnswerService
  ) {
    this.subscription = this.timerService.getBoolean().subscribe((x) => {
      if (x) {
        this.timerService.timeout = true
        this.timeout = true
        this.setIsDisplayed(true)
        this.setAnswerButtonVisible(false)
      }
    })
  }

  ngOnInit(): void {
    // Subskrybuj zmiany wartości
    this.subscription2 = this.questionAnswerService.answer$.subscribe((value) => {
      this.answer = value // Aktualizuj widok, gdy wartość się zmieni
    })
    this.questionAnswerService.setWinner(this.playerService.actualPlayer)
    // this.setQuestion()
    this.timerService.setTimer(0.5)
  }

  ngOnDestroy() {
    // Usuń subskrypcję, aby uniknąć wycieków pamięci
    this.subscription2.unsubscribe()
  }

  getAnswerVisibleInfo(): string {
    return this.answer
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
