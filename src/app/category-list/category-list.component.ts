import { Component, OnInit } from '@angular/core'
import { randomFromArray } from '../../common/randomize.helper'
import { Subscription } from 'rxjs'
import { QuestionTypesService } from '../question-types.service'
import { PlayersService } from '../players.service'

import { Category } from '../model/category-model'
import { groupedCategories } from '../../assets/categories/categories'

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
  public areCategoriesChoosen = false
  categories: Category[] = []
  public groupedCategories = groupedCategories

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
        this.areCategoriesChoosen = true
        this.confirm()
      } else {
        this.areCategoriesChoosen = false
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
    switch (category) {
      case 0: {
        const tmp = randomFromArray(this.groupedCategories[0].categories)
        this.categoryService.setActiveCategory(tmp.id)
        break
      }
      case 1: {
        const tmp = randomFromArray(this.groupedCategories[1].categories)
        this.categoryService.setActiveCategory(tmp.id)
        break
      }
      case 2: {
        const tmp = randomFromArray(this.groupedCategories[2].categories)
        this.categoryService.setActiveCategory(tmp.id)
        break
      }
      case 3: {
        const tmp = randomFromArray(this.groupedCategories[3].categories)
        this.categoryService.setActiveCategory(tmp.id)
        break
      }
      case 4: {
        const tmp = randomFromArray(this.groupedCategories[4].categories)
        this.categoryService.setActiveCategory(tmp.id)
        break
      }
      case 5: {
        const tmp = randomFromArray(this.groupedCategories[5].categories)
        this.categoryService.setActiveCategory(tmp.id)
        break
      }
      case 6: {
        this.categoryService.setActiveCategory(this.groupedCategories[6].categories[0].id)
        break
      }
      case 7: {
        const tmp = randomFromArray(this.groupedCategories[7].categories)
        this.categoryService.setActiveCategory(tmp.id)
        break
      }
      case 8: {
        this.categoryService.setActiveCategory(this.groupedCategories[8].categories[0].id)
        break
      }
      case 9: {
        this.categoryService.setActiveCategory(this.groupedCategories[9].categories[0].id)
        break
      }
      case 10: {
        this.categoryService.setActiveCategory(this.groupedCategories[10].categories[0].id)
        break
      }
      case 11: {
        this.categoryService.setActiveCategory(this.groupedCategories[11].categories[0].id)
        break
      }
      case 12: {
        this.categoryService.setActiveCategory(this.groupedCategories[12].categories[0].id)
        break
      }
      default: {
        break
      }
    }
  }
}
