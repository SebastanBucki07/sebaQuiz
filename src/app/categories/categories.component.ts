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
    {name: "Test1", id: 0, checkbox: false},
    {name: "test2", id: 1, checkbox: false},
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
      console.log(tmp)
      this.allCategories.splice(tmp,1)
      console.log(`all ${JSON.stringify(this.allCategories)}`)
      category.checkbox = true
      this.chosenCategories.push(
        {
          name: category.name,
          id: category.id,
          checkbox: true
        })
      console.log(JSON.stringify(category))

      console.log(`checked ${JSON.stringify(this.chosenCategories)}`)
    }
  }

  toggle2($event: MatCheckboxChange, category: Category) {
    if (!$event.checked) {
      const tmp = this.chosenCategories.indexOf(category)
      console.log(tmp)
      this.chosenCategories.splice(tmp,1)
      console.log(`all ${JSON.stringify(this.chosenCategories)}`)
      category.checkbox = true
      this.allCategories.push(
        {
          name: category.name,
          id: category.id,
          checkbox: false
        })
      console.log(JSON.stringify(category))

      console.log(`checked ${JSON.stringify(this.allCategories)}`)
    }
  }
}
