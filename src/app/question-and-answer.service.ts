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

  constructor() {
    console.log(`question and answer service`)
  }

  setAnswer(answer: string): void {
    this.answer = answer
  }

  setQuestion(question: string): void {
    this.question = question
  }

  setTip(tip: string): void {
    this.tip = tip
  }

  getAnswer(): string {
    return this.answer
  }

  setWinner(winnerId: number): void {
    this.winnerId = winnerId
  }

  getWinnerId(): number {
    return this.winnerId
  }

  setPointsForQuestion(points: number): void {
    this.points = points
  }

  getPointsForQuestion(): number {
    return this.points
  }

  setIsFlague(isFlague: boolean): void {
    this.isFlague = isFlague
  }

  getIsFlague(): boolean {
    return this.isFlague
  }

  setIsPhoto(isPhoto: boolean): void {
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
