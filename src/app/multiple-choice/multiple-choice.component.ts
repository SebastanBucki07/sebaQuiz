import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { UserAnswer } from '../model/userAnswer-model'
import { QuestionMultipleChoice } from '../model/question-model'
import { QuestionDataService } from '../question-data.service'
import { PlayersService } from '../players.service'
import { getAndDeleteRandomElementFromArray } from '../../common/randomize.helper'
import { TimerService } from '../timer.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css'],
})
export class MultipleChoiceComponent implements OnInit {
  private subscription: Subscription | any
  public isVisible = false
  public isModalVisible = false
  public answer = ''
  public points = 2
  public correct = false
  public settedQuestion: QuestionMultipleChoice | any = {}
  public submitAnswerButtonEnabled = true
  public answerButtonsDisabled = false

  @Input() question = this.settedQuestion as QuestionMultipleChoice
  @Input() number = 0
  @Output() setAnswer = new EventEmitter<UserAnswer>()

  selectedAnswer = ''

  constructor(
    public questionDataService: QuestionDataService,
    public timerService: TimerService,
    public playerService: PlayersService
  ) {}

  init(): void {
    this.timerService.setTimer(0.5)
    this.subscription = this.timerService.getBooleean().subscribe((x) => {
      if (x) {
        this.isVisible = true
        this.submitAnswerButtonEnabled = true
        this.answerButtonsDisabled = true
      }
    })
    this.settedQuestion = this.questionDataService.getMultipleChoiceQuestion()
    const arrray = [this.settedQuestion.a, this.settedQuestion.b, this.settedQuestion.c]
    const indexes = [0, 1, 2]
    const array2 = []
    do {
      const tmp = getAndDeleteRandomElementFromArray(indexes)
      array2.push(arrray[tmp])
    } while (indexes.length > 0)
    this.settedQuestion.a = array2[0]
    this.settedQuestion.b = array2[1]
    this.settedQuestion.c = array2[2]
    this.isModalVisible = true
    this.answer = this.settedQuestion.answer
  }

  ngOnInit(): void {
    this.init()
  }

  close(): void {
    this.isVisible = false
    this.answer = ''
    this.correct = false
    this.submitAnswerButtonEnabled = false
    this.answerButtonsDisabled = false
    this.playerService.nextPlayer()
    this.timerService.resetTimeout()
    this.init()
    this.timerService.setTimer(0.5)
    this.playerService.setModal(false)
    this.selectedAnswer = ''
  }

  showAnswer(): void {
    this.isVisible = true
    this.answerButtonsDisabled = true
    this.submitAnswerButtonEnabled = true
    if (this.selectedAnswer.includes(this.settedQuestion.answer)) {
      this.correct = true
    }
    this.subscription.unsubscribe()
    this.timerService.resetTimeout()
  }

  pickAnswer(id: number, answer: string, value: string): void {
    this.submitAnswerButtonEnabled = false
    this.selectedAnswer = `[${answer}] ${value}`
    this.setAnswer.emit({ questionId: id, value: answer })
  }
}
