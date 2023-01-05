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
    {name: "Wypisz kraje lub stolice", id: 2, checkbox: false},
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
    {name: "W jakim filmie zagrała taka obsada?", id: 14, checkbox: false},
    {name: "W jakim serialu zagrała taka obsada?", id: 15, checkbox: false},
    {name: "Jaka to melodia?", id: 16, checkbox: false},
    {name: "Czołówka serialu", id: 17, checkbox: false},
    {name: "Pierwiastki", id: 18, checkbox: false},
    {name: "Biologia", id: 19, checkbox: false},
    {name: "Bogowie", id: 20, checkbox: false},
    {name: "Rozpoznaj artystę po tytułach piosenek", id: 21, checkbox: false},
    {name: "Państwo po miastach", id: 22, checkbox: false},
    {name: "Rozpoznaj film po bohaterach", id: 23, checkbox: false},
    {name: "Rozpoznaj serial po bohaterach", id: 24, checkbox: false},
    {name: "Reżyser po filmach", id: 25, checkbox: false},
    {name: "Rozpoznaj impreze po piosence", id: 26, checkbox: false},
    {name: "Zawodnik/klub/reprezentacja", id: 27, checkbox: false},
    {name: "Pytanie wielokrotnego wyboru", id: 28, checkbox: false},
    {name: "Z jakiego krjau jest ta flaga?", id: 29, checkbox: false},
    {name: "Stolice krajów?", id: 30, checkbox: false},
    {name: "Familiada", id: 31, checkbox: false},
  ]
  public smallCategories: Category[] = [
    {name: "Filmy", id: 0, checkbox: false},
    {name: "Seriale", id: 1, checkbox: false},
    {name: "Szkoła", id: 2, checkbox: false},
    {name: "Muyzka", id: 3, checkbox: false},
    {name: "Kraje", id: 4, checkbox: false},
    {name: "piłka nożna", id: 5, checkbox: false},
    {name: "Gry", id: 6, checkbox: false},
    {name: "Wiedza ogólna A/B/C/D", id: 7, checkbox: false},
    {name: "Znane postacie", id: 8, checkbox: false},
    {name: "Wypisz kraje lub stolice", id: 9, checkbox: false},
    {name: "Familiada", id: 10, checkbox: false},
  ]

  public chosenCategories: Category[] = []
  public acceptCategoriesButtonDisabled :boolean = true;

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

  validNumberOfRequiredCategory(){
    this.chosenCategories.length >=2 ? this.acceptCategoriesButtonDisabled=false : this.acceptCategoriesButtonDisabled=true
  }

  toggle($event: MatCheckboxChange, category: Category) {
    if ($event.checked) {
      const tmp = this.smallCategories.indexOf(category)
      this.smallCategories.splice(tmp,1)
      category.checkbox = true
      this.chosenCategories.push(
        {
          name: category.name,
          id: category.id,
          checkbox: true
        })
    }
    this.validNumberOfRequiredCategory()
  }

  toggle2($event: MatCheckboxChange, category: Category) {
    if (!$event.checked) {
      const tmp = this.chosenCategories.indexOf(category)
      this.chosenCategories.splice(tmp,1)
      category.checkbox = true
      this.smallCategories.push(
        {
          name: category.name,
          id: category.id,
          checkbox: false
        })
      console.log(`all categories: ${JSON.stringify(this.allCategories)}`)
    }
    this.validNumberOfRequiredCategory()
  }
}
