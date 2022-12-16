import {Component} from '@angular/core';
import {Category} from "./categories/categories.component";
import {QuestionTypesService} from "./question-types.service";
import {Player} from "./players/players.component";
import {PlayersService} from "./players.service";
import {randomFromArray} from "../common/randomize.helper";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'seba Quiz';
  questionType: number;
  categoryType: number;
  categories: Category[] = []
  players: Player[] = []
  categoriesId: number[] = []
  public movieCategories: Category[] = [
    {name: "Filmy - opis", id: 5, checkbox: false},
    {name: "W jakim filmie zagrała taka obsada?", id: 14, checkbox: false},
  ]

  public serialCategories: Category[] = [
    {name: "Seriale - opis", id: 6, checkbox: false},
    {name: "W jakim serialu zagrała taka obsada?", id: 15, checkbox: false},
    {name: "Czołówka serialu", id: 17, checkbox: false},
  ]

  public schoolCategories: Category[] = [
    {name: "Fragmenty ksiażek", id: 0, checkbox: false},
    {name: "Rozpoznaj budowle ze zdjęcia", id: 13, checkbox: false},
    {name: "Miasto - Województwo", id: 8, checkbox: false},
    {name: "Historia", id: 11, checkbox: false},
    {name: "Pierwiastki", id: 18, checkbox: false},
  ]
  public musicCategories: Category[] = [
    {name: "Fragmenty piosenek", id: 1, checkbox: false},
    {name: "Jaka to melodia?", id: 16, checkbox: false},
  ]
  public footballCategories: Category[] = [
    {name: "Klubowa Historia", id: 3, checkbox: false},
    {name: "Klubowe herby", id: 4, checkbox: false},
    {name: "Stadiony świata", id: 9, checkbox: false},
  ]
  public lifeCategories: Category[] = [
    {name: "Rozpoznaj osobe ze zdjęcia", id: 12, checkbox: false},
    {name: "Przysłowia", id: 10, checkbox: false},
  ]
  public countryCategory: Category = {name: "Kraje", id: 2, checkbox: false}
  public gamesCategory: Category = {name: "Gra - opis", id: 7, checkbox: false}

  async ngOnInit(): Promise<void> {
    this.questionType = -1
    this.categoryType = -1
  }

  constructor(public categoryService: QuestionTypesService,
              public playerService: PlayersService) {
    this.questionType = -1
    this.categoryType = -1
  }

  confirm() {
    this.categories = this.categoryService.getCategories()
    this.categories.forEach((category) => {
      this.categoriesId.push(category.id)
    })
  }

  addPlayers() {
    this.players = this.playerService.getPlayers()
  }

  confirmPlayers() {
    this.playerService.acceptPlayers()
  }

  setQuestionType(question: number) {
    const actualCategory = this.categoryType
    let category = question
    if (question === 50) {
      do {
        const tmp = randomFromArray(this.categories)
        category = tmp.id
      } while (actualCategory  === category)
    }
      this.categoryType = category
      switch (category) {
        case 0: {
          const tmp = randomFromArray(this.movieCategories)
          this.questionType = tmp.id
          break
        }
        case 1: {
          const tmp = randomFromArray(this.serialCategories)
          this.questionType = tmp.id
          break
        }
        case 2: {
          const tmp = randomFromArray(this.schoolCategories)
          this.questionType = tmp.id
          break
        }
        case 3: {
          const tmp = randomFromArray(this.musicCategories)
          this.questionType = tmp.id
          break
        }
        case 4: {
          this.questionType = this.countryCategory.id
          break
        }
        case 5: {
          const tmp = randomFromArray(this.footballCategories)
          this.questionType = tmp.id
          break
        }
        case 6: {
          this.questionType = this.gamesCategory.id
          break
        }
        case 7: {
          const tmp = randomFromArray(this.lifeCategories)
          this.questionType = tmp.id
          break
        }
        default: {
          break;
        }
      }
  }
}

