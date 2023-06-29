import { Component, OnInit } from '@angular/core'
import { QuestionAndAnswerService } from '../question-and-answer.service'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  protected question = ''
  protected tip = ''
  protected isFlague = false
  protected isPhoto = false

  constructor(protected questionAndAnswerService: QuestionAndAnswerService) {}

  ngOnInit(): void {
    this.setQuestion()
    this.setTip()
    this.setFlague()
    this.setPhoto()
  }

  setQuestion(): void {
    this.question = this.questionAndAnswerService.getQuestion()
  }

  setTip(): void {
    this.tip = this.questionAndAnswerService.getTip()
  }

  setFlague(): void {
    this.isFlague = this.questionAndAnswerService.getIsFlague()
  }

  setPhoto(): void {
    this.isPhoto = this.questionAndAnswerService.getIsPhoto()
  }
}
