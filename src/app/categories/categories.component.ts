import { Component, OnInit } from '@angular/core'
import { QuestionTypesService } from '../question-types.service'
import { Subscription } from 'rxjs'
import { Category } from '../model/category-model'
import { allCategories } from '../../assets/categories/categories'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { PlayersService } from '../players.service'

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
  private playerSubscription: Subscription | any
  public categoriesForChoose: Category[] = allCategories
  playerAdded = false

  protected moveAllCategoriesTo(chosen: boolean) {
    if (chosen) {
      this.chosenCategories.forEach((category) => {
        this.categoriesForChoose.push(category)
      })
      this.chosenCategories = []
    } else {
      this.categoriesForChoose.forEach((category) => {
        this.chosenCategories.push(category)
      })
      this.categoriesForChoose = []
    }
    this.validNumberOfRequiredCategory()
  }

  protected onDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
    }
    this.validNumberOfRequiredCategory()
  }

  constructor(private service: QuestionTypesService, private playerService: PlayersService) {}

  ngOnInit(): void {
    console.log(`init CategoriesComponent`)
    this.subscription = this.service.getChosen().subscribe((x) => {
      this.areCategoriesChosen = x
    })
    this.playerSubscription = this.playerService.getPlayerLength().subscribe((x) => {
      this.playerAdded = x.length > 1
    })
  }

  sendCategories(category: Category[]): void {
    this.acceptCategoriesButtonDisabled = true
    this.service.setChosen(true)
    this.service.setCategories(category)
  }

  validNumberOfRequiredCategory(): void {
    this.chosenCategories.length >= 2
      ? (this.acceptCategoriesButtonDisabled = false)
      : (this.acceptCategoriesButtonDisabled = true)
  }

  change(choose: boolean, category: Category) {
    if (choose) {
      const elementToBeDeleted = this.categoriesForChoose.indexOf(category)
      this.categoriesForChoose.splice(elementToBeDeleted, 1)
      this.chosenCategories.push(category)
    } else {
      const elementToBeDeleted = this.chosenCategories.indexOf(category)
      this.chosenCategories.splice(elementToBeDeleted, 1)
      this.categoriesForChoose.push(category)
    }
    this.validNumberOfRequiredCategory()
  }
}
