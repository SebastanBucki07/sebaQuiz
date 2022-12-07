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
    {name: "Kraje", id: 2, checkbox: false},
    {name: "Klubowa Historia", id: 3, checkbox: false},
    {name: "Klubowe herby", id: 4, checkbox: false},
    {name: "Filmy - opis", id: 5, checkbox: false},
    {name: "Seriale - opis", id: 6, checkbox: false},
    {name: "Gra - opis", id: 7, checkbox: false},
    {name: "Miasto - Województwo", id: 8, checkbox: false},
    {name: "Stadiony świata", id: 9, checkbox: false},
    {name: "Przysłowia", id: 10, checkbox: false},
    {name: "Historia", id: 11, checkbox: false},
    {name: "Rozpoznaj osobe ze zdjęcia", id: 12, checkbox: false},
    {name: "Rozpoznaj budowle ze zdjęcia", id: 13, checkbox: false},
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
