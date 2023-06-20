import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class QuestionAndAnswerService {
  protected answer = ''
  protected question = ''
  protected tip = ''
  protected isFlague = false
  protected isPhoto = false
  protected winnerId = 0
  protected points = 0

  constructor() {}

  setAnswer(answer: string): void {
    this.answer = answer
  }

  setQuestion(question: string): void {
    this.question = question
  }

  setTip(tip: string) {
    this.tip = tip
  }

  getAnswer(): string {
    return this.answer
  }

  setWinner(winnerId: number) {
    this.winnerId = winnerId
  }

  getWinnerId(): number {
    return this.winnerId
  }

  setPointsForQuestion(points: number) {
    this.points = points
  }

  getPointsForQuestion(): number {
    return this.points
  }

  setIsFlague(isFlague: boolean) {
    this.isFlague = isFlague
  }

  getIsFlague(): boolean {
    return this.isFlague
  }

  setIsPhoto(isPhoto: boolean) {
    this.isPhoto = isPhoto
  }

  getIsPhoto(): boolean {
    return this.isPhoto
  }

  getQuestion(): string {
    return this.question
  }

  getTip(): string {
    return this.tip
  }
}
