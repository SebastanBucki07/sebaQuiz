import { Component, OnInit } from '@angular/core'
import { MatCheckboxChange } from '@angular/material/checkbox'
import { QuestionTypesService } from '../question-types.service'
import { Subscription } from 'rxjs'
import { Category } from '../model/category-model'
import { smallCategories } from '../../assets/categories/categories'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  public chosenCategories: Category[] = []
  public acceptCategoriesButtonDisabled = true
  public areCategoriesChosen = false
  private subscription: Subscription | any
  protected smallCategories = smallCategories

  constructor(private service: QuestionTypesService) {}

  ngOnInit(): void {
    console.log(`init CategoriesComponent`)
    this.subscription = this.service.getChoosen().subscribe((x) => {
      this.areCategoriesChosen = x
    })
  }

  sendCategories(category: Category[]): void {
    this.acceptCategoriesButtonDisabled = true
    this.service.setChoosen(true)
    this.service.setCategories(category)
  }

  validNumberOfRequiredCategory(): void {
    this.chosenCategories.length >= 2
      ? (this.acceptCategoriesButtonDisabled = false)
      : (this.acceptCategoriesButtonDisabled = true)
  }

  toggle($event: MatCheckboxChange, category: Category): void {
    if ($event.checked) {
      const tmp = this.smallCategories.indexOf(category)
      this.smallCategories.splice(tmp, 1)
      category.checkbox = true
      this.chosenCategories.push({
        name: category.name,
        id: category.id,
        checkbox: true,
      })
    }
    this.validNumberOfRequiredCategory()
  }

  toggle2($event: MatCheckboxChange, category: Category): void {
    if (!$event.checked) {
      const tmp = this.chosenCategories.indexOf(category)
      this.chosenCategories.splice(tmp, 1)
      category.checkbox = true
      this.smallCategories.push({
        name: category.name,
        id: category.id,
        checkbox: false,
      })
    }
    this.validNumberOfRequiredCategory()
  }
}
