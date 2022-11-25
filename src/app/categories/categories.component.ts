import {Component, OnInit} from '@angular/core';
import {MatCheckboxChange} from "@angular/material/checkbox";
import {QuestionTypesService} from "../question-types.service";
import {AppComponent} from "../app.component";

export interface Category {
  name: string,
  id: number,
  checkbox: boolean
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public allCategories: Category[] = [
    {name: "Fragmenty ksiażek", id: 0, checkbox: false},
    {name: "Fragmenty piosenek", id: 1, checkbox: false},
    {name: "test3", id: 1, checkbox: false},
  ]
  public chosenCategories: Category[] = []

  constructor(
    private service: QuestionTypesService,
    public myApp: AppComponent) {
  }

  ngOnInit(): void {
  }

  sendCategories(category:Category[]){
    this.service.setCategories(category)
    this.myApp.confirm()
  }



  toggle($event: MatCheckboxChange, category: Category) {
    if ($event.checked) {
      const tmp = this.allCategories.indexOf(category)
      this.allCategories.splice(tmp,1)
      category.checkbox = true
      this.chosenCategories.push(
        {
          name: category.name,
          id: category.id,
          checkbox: true
        })
    }
  }

  toggle2($event: MatCheckboxChange, category: Category) {
    if (!$event.checked) {
      const tmp = this.chosenCategories.indexOf(category)
      this.chosenCategories.splice(tmp,1)
      category.checkbox = true
      this.allCategories.push(
        {
          name: category.name,
          id: category.id,
          checkbox: false
        })
    }
  }
}
