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

  getChoosen(): Observable<boolean> {
    return interval(1000).pipe(map(() => this.chosen))
  }

  setChoosen(choosen: boolean): void {
    this.chosen = choosen
  }

  setCategories(categories: Category[]): void {
    this.categories = categories
  }

  getCategories(): Category[] {
    return this.categories
  }

  setActiveCategory(category: number): void {
    console.log(`set category to ${category}`)
    this.activeCategory = category
  }

  getActiveCategory(): Observable<number> {
    console.log(`active category: ${this.activeCategory}`)
    return interval(1000).pipe(map(() => this.activeCategory))
  }
}
