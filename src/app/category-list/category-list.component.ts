import { Component, OnInit } from '@angular/core'
import { randomFromArray } from '../../common/randomize.helper'
import { Subscription } from 'rxjs'
import { QuestionTypesService } from '../question-types.service'
import { PlayersService } from '../players.service'

import { Category } from '../model/category-model'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  protected categoryType: number
  protected questionType: number
  private subscription: Subscription | any
  private subscription2: Subscription | any
  categoriesId: number[] = []
  public areCategoriesChosen = false
  categories: Category[] = []

  constructor(public categoryService: QuestionTypesService, public playerService: PlayersService) {
    this.questionType = -1
    this.categoryType = -1
  }

  ngOnInit(): void {
    this.questionType = -1
    this.categoryType = -1
    this.subscription = this.categoryService.getActiveCategory().subscribe((x) => {
      this.questionType = x
    })
    this.subscription2 = this.categoryService.getChoosen().subscribe((x) => {
      if (x) {
        this.areCategoriesChosen = true
        this.confirm()
      } else {
        this.areCategoriesChosen = false
      }
    })
  }

  confirm(): void {
    this.categories = this.categoryService.getCategories()
    this.categories.forEach((category) => {
      this.categoriesId.push(category.id)
    })
  }

  setQuestionType(question: number): void {
    const actualCategory = this.categoryType
    let category = question
    if (question === 50) {
      do {
        console.log(`array: ${JSON.stringify(this.categories)}`)
        const tmp = randomFromArray(this.categories)
        console.log(`tmp: ${JSON.stringify(tmp)}`)
        category = tmp.id
      } while (actualCategory === category)
    }
    console.log(`category: ${JSON.stringify(category)}`)
    this.categoryService.setActiveCategory(category)
  }
}
