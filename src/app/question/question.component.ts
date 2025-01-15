import { Component, OnInit } from '@angular/core'
import { QuestionAndAnswerService } from '../question-and-answer.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  protected question = ''
  protected tip = ''
  protected isFlag = false
  protected isPhoto = false
  private subscription!: Subscription

  constructor(protected questionAndAnswerService: QuestionAndAnswerService) {}

  ngOnInit(): void {
    this.setQuestion()
    // this.setTip()
    // Subskrybuj zmiany wartości
    this.subscription = this.questionAndAnswerService.tip$.subscribe((value) => {
      this.tip = value // Aktualizuj widok, gdy wartość się zmieni
    })
    this.subscription = this.questionAndAnswerService.isPhoto$.subscribe((value) => {
      this.isPhoto = value // Aktualizuj widok, gdy wartość się zmieni
    })
    this.setFlague()
    // this.setPhoto()
  }

  setQuestion(): void {
    this.question = this.questionAndAnswerService.getQuestion()
  }

  // setTip(): void {
  //   this.tip = this.questionAndAnswerService.getTip()
  // }

  setFlague(): void {
    this.isFlag = this.questionAndAnswerService.getIsFlag()
  }

  // setPhoto(): void {
  //   this.isPhoto = this.questionAndAnswerService.getIsPhoto()
  // }
}
