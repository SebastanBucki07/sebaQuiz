import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {UserAnswer} from '../model/userAnswer-model';
import {QuestionMultipleChoice} from '../model/question-model';
import {QuestionDataService} from "../question-data.service";
import {PlayersService} from "../players.service";
import {getAndDeleteRandomElementFromArray} from "../../common/randomize.helper";
import {TimerService} from "../timer.service";

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css']
})
export class MultipleChoiceComponent implements OnInit {
  public isVisible = false;
  public isModalVisible = false
  public answer = ''
  public points = 2
  public correct = false
  public settedQuestion: QuestionMultipleChoice | any = {}
  public submitAnswerButtonEnabled = true
  public answerButtonsDisabled = false

  constructor(
    public questionDataService: QuestionDataService,
    private timerService: TimerService,
    public playerService: PlayersService) {
  }

  init(){
    this.timerService.setTimer(1)
    this.settedQuestion = this.questionDataService.getMultipleChoiceQuestion()
    const arrray = [this.settedQuestion.a, this.settedQuestion.b, this.settedQuestion.c]
    const indexes = [0, 1, 2]
    const array2 = []
    do {
      let tmp = getAndDeleteRandomElementFromArray(indexes)
      array2.push(arrray[tmp])
      console.log(arrray[tmp])
    } while (indexes.length > 0)
    this.settedQuestion.a = array2[0]
    this.settedQuestion.b = array2[1]
    this.settedQuestion.c = array2[2]
    this.isModalVisible = true;
    this.answer = this.settedQuestion.answer
  }

  ngOnInit(): void {
   this.init()
  }

  close() {
    this.isVisible = false;
    this.answer = ''
    this.correct = false
    this.submitAnswerButtonEnabled = true
    this.answerButtonsDisabled = false
    this.playerService.nextPlayer()
    this.init()
    this.playerService.setModal(false);
    this.selectedAnswer = ''
  }

  showAnswer() {
    this.isVisible = true
    this.answerButtonsDisabled = true
    this.submitAnswerButtonEnabled = true
    if (this.selectedAnswer.includes(this.settedQuestion.answer)) {
      this.correct = true
    }
  }

  @Input() question = this.settedQuestion as QuestionMultipleChoice
  @Input() number = 0;
  @Output() setAnswer = new EventEmitter<UserAnswer>();

  selectedAnswer = '';


  pickAnswer(id: number, answer: string, value: string) {
    this.submitAnswerButtonEnabled = false
    this.selectedAnswer = `[${answer}] ${value}`;
    this.setAnswer.emit({questionId: id, value: answer});
  }

}
