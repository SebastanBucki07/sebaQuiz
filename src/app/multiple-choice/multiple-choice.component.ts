import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { UserAnswer } from '../model/userAnswer-model'
import { QuestionMultipleChoice } from '../model/question-model'
import { QuestionDataService } from '../question-data.service'
import { PlayersService } from '../players.service'
import { getAndDeleteRandomElementFromArray } from '../../common/randomize.helper'
import { TimerService } from '../timer.service'
import { Subscription } from 'rxjs'
import { QuestionTypesService } from '../question-types.service'
import { QuestionAndAnswerService } from '../question-and-answer.service'

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css'],
})
export class MultipleChoiceComponent implements OnInit {
  private subscription: Subscription | any
  protected isVisible = false
  protected isModalVisible = false
  protected answer = ''
  protected correct = false
  protected setQuestion: QuestionMultipleChoice | any = {}
  protected submitAnswerButtonEnabled = true
  protected answerButtonsDisabled = false

  @Input() question = this.setQuestion as QuestionMultipleChoice
  @Input() number = 0
  @Output() setAnswer = new EventEmitter<UserAnswer>()

  selectedAnswer = ''

  constructor(
    private questionDataService: QuestionDataService,
    private questionTypeService: QuestionTypesService,
    private questionAnswerService: QuestionAndAnswerService,
    public timerService: TimerService,
    protected playerService: PlayersService
  ) {}

  init(): void {
    this.timerService.setTimer(0.5)
    this.subscription = this.timerService.getBoolean().subscribe((x) => {
      if (x) {
        this.isVisible = true
        this.submitAnswerButtonEnabled = true
        this.answerButtonsDisabled = true
      }
    })
    this.setQuestion = this.questionDataService.getMultipleChoiceQuestion()
    const array = [this.setQuestion.a, this.setQuestion.b, this.setQuestion.c]
    const indexes = [0, 1, 2]
    const array2 = []
    do {
      const randomIndex = getAndDeleteRandomElementFromArray(indexes)
      array2.push(array[randomIndex])
    } while (indexes.length > 0)
    this.setQuestion.a = array2[0]
    this.setQuestion.b = array2[1]
    this.setQuestion.c = array2[2]
    this.isModalVisible = true
    this.answer = this.setQuestion.answer
    this.questionAnswerService.setPointsForQuestion(2)
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
    this.questionTypeService.setActiveCategory(-1)
    this.timerService.resetTimeout()
    this.init()
    this.timerService.setTimer(0.5)
    this.selectedAnswer = ''
  }

  showAnswer(): void {
    this.isVisible = true
    this.answerButtonsDisabled = true
    this.submitAnswerButtonEnabled = true
    if (this.selectedAnswer.includes(this.setQuestion.answer)) {
      this.correct = true
      this.questionAnswerService.setWinner(this.playerService.actualPlayer)
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
