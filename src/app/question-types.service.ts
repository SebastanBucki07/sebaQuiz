import { Injectable } from '@angular/core'
import { Category } from './categories/categories.component'

@Injectable({
  providedIn: 'root',
})
export class QuestionTypesService {
  public categories: Category[] = []
  public chosen: boolean

  constructor() {
    this.chosen = true
  }

  setCategories(categories: Category[]): void {
    this.categories = categories
    this.chosen = false
  }

  getCategories(): Category[] {
    return this.categories
  }
}
