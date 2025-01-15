import { Injectable } from '@angular/core'
import { interval, map, Observable } from 'rxjs'
import { Category } from './model/category-model'

@Injectable({
  providedIn: 'root',
})
export class QuestionTypesService {
  protected categories: Category[] = []
  protected chosen = false
  protected activeCategory = -1

  constructor() {
    console.log(`question-types service`)
  }

  getChosen(): Observable<boolean> {
    return interval(1000).pipe(map(() => this.chosen))
  }

  setChosen(chosen: boolean): void {
    this.chosen = chosen
  }

  setCategories(categories: Category[]): void {
    this.categories = categories
  }

  getCategories(): Category[] {
    return this.categories
  }

  setActiveCategory(category: number): void {
    this.activeCategory = category
  }

  getActiveCategory(): Observable<number> {
    return interval(1000).pipe(map(() => this.activeCategory))
  }
}
