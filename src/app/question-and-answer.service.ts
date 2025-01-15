import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class QuestionAndAnswerService {
  //protected answer = ''
  private fieldValueSubject = new BehaviorSubject<string>('') // Domyślna wartość
  answer$ = this.fieldValueSubject.asObservable() // Publiczny obserwowany strumień
  private fieldValueSubject2 = new BehaviorSubject<string>('') // Domyślna wartość
  tip$ = this.fieldValueSubject2.asObservable() // Publiczny obserwowany strumień
  private fieldValueSubject3 = new BehaviorSubject<boolean>(false) // Domyślna wartość
  isPhoto$ = this.fieldValueSubject3.asObservable() // Publiczny obserwowany strumień
  protected question = ''
  //protected tip = ''
  protected isFlague = false
  //protected isPhoto = false
  protected winnerId = 0
  protected points = 0

  constructor() {
    console.log(`question and answer service`)
  }

  async setAnswer(answer: string): Promise<void> {
    this.fieldValueSubject.next(answer)
  }

  setQuestion(question: string): void {
    this.question = question
  }

  setTip(tip: string): void {
    this.fieldValueSubject2.next(tip)
  }

  // getAnswer(): string {
  //   return this.answer
  // }

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

  setIsFlag(isFlague: boolean): void {
    this.isFlague = isFlague
  }

  getIsFlag(): boolean {
    return this.isFlague
  }

  setIsPhoto(isPhoto: boolean): void {
    this.fieldValueSubject3.next(isPhoto)
  }

  // getIsPhoto(): boolean {
  //   return this.isPhoto
  // }

  getQuestion(): string {
    return this.question
  }

  // getTip(): string {
  //   return this.tip
  // }
}
