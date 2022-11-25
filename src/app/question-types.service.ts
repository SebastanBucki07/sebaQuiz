import { Injectable } from '@angular/core';
import {Category} from "./categories/categories.component";

@Injectable({
  providedIn: 'root'
})
export class QuestionTypesService {
  public categories:Category[] = []
  public chosen: boolean

  constructor() {
    this.chosen = true
  }

  setCategories(categories:Category[]) {
    console.log(`${JSON.stringify(categories)}`)
    this.categories = categories
    this.chosen = false
  }

  getCategories():Category[] {
    console.log(`aaaa: ${JSON.stringify(this.categories)}`)
    return this.categories
  }
}
