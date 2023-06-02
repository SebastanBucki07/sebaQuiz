import { Component } from '@angular/core'
import { Category } from './categories/categories.component'
import { QuestionTypesService } from './question-types.service'
import { Player } from './players/players.component'
import { PlayersService } from './players.service'
import { randomFromArray } from '../common/randomize.helper'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'seba Quiz'
  questionType: number
  categoryType: number
  categories: Category[] = []
  players: Player[] = []
  categoriesId: number[] = []
  public movieCategories: Category[] = [
    { name: 'Filmy - opis', id: 5, checkbox: false },
    { name: 'W jakim filmie zagrała taka obsada?', id: 14, checkbox: false },
    { name: 'Rozpoznaj film po bohaterach', id: 23, checkbox: false },
    { name: 'Reżyser po filmach', id: 25, checkbox: false },
  ]

  public serialCategories: Category[] = [
    { name: 'Seriale - opis', id: 6, checkbox: false },
    { name: 'W jakim serialu zagrała taka obsada?', id: 15, checkbox: false },
    { name: 'Czołówka serialu', id: 17, checkbox: false },
    { name: 'Rozpoznaj serial po bohaterach', id: 24, checkbox: false },
  ]

  public schoolCategories: Category[] = [
    { name: 'Fragmenty ksiażek', id: 0, checkbox: false },
    { name: 'Rozpoznaj budowle ze zdjęcia', id: 13, checkbox: false },
    { name: 'Miasto - Województwo', id: 8, checkbox: false },
    { name: 'Historia', id: 11, checkbox: false },
    { name: 'Pierwiastki', id: 18, checkbox: false },
    // {name: "Biologia", id: 19, checkbox: false},
    { name: 'Bogowie', id: 20, checkbox: false },
  ]
  public musicCategories: Category[] = [
    { name: 'Fragmenty piosenek', id: 1, checkbox: false },
    { name: 'Jaka to melodia?', id: 16, checkbox: false },
    { name: 'Rozpoznaj artystę po tytułach piosenek', id: 21, checkbox: false },
  ]
  public footballCategories: Category[] = [
    { name: 'Klubowa Historia', id: 3, checkbox: false },
    { name: 'Klubowe herby', id: 4, checkbox: false },
    { name: 'Stadiony świata', id: 9, checkbox: false },
    // {name: "Rozpoznaj impreze po piosence", id: 26, checkbox: false},
    { name: 'Zawodnik/klub/reprezentacja', id: 27, checkbox: false },
    { name: 'Był taki mecz', id: 32, checkbox: false },
    { name: 'Wypisywanie róznych wspólnych - piłka nożna', id: 34, checkbox: false },
  ]
  public lifeCategories: Category[] = [
    // {name: "Przysłowia", id: 10, checkbox: false},
    { name: 'Pytanie wielokrotnego wyboru', id: 28, checkbox: false },
  ]

  public famousPeople: Category = { name: 'Rozpoznaj osobe ze zdjęcia', id: 12, checkbox: false }

  public countryCategory: Category[] = [
    { name: 'Państwo po miastach', id: 22, checkbox: false },
    { name: 'Z jakiego krjau jest ta flaga?', id: 29, checkbox: false },
    { name: 'Stolice krajów?', id: 30, checkbox: false },
  ]
  public countryInputCategory: Category = { name: 'Wypisz kraje lub stolice', id: 2, checkbox: false }

  public familiada: Category = { name: 'Familiada', id: 31, checkbox: false }

  public gamesCategory: Category = { name: 'Gra - opis', id: 7, checkbox: false }

  public writtingCategory: Category = { name: 'Wypisywanie róznych wspólnych', id: 33, checkbox: false }

  public footballCross: Category = { name: 'Piłkarskie kółko i krzyżyk', id: 35, checkbox: false }

  constructor(public categoryService: QuestionTypesService, public playerService: PlayersService) {
    this.questionType = -1
    this.categoryType = -1
  }

  async ngOnInit(): Promise<void> {
    this.questionType = -1
    this.categoryType = -1
  }

  confirm(): void {
    this.categories = this.categoryService.getCategories()
    this.categories.forEach((category) => {
      this.categoriesId.push(category.id)
    })
  }

  addPlayers(): void {
    this.players = this.playerService.getPlayers()
  }

  confirmPlayers(): void {
    this.playerService.acceptPlayers()
  }

  setQuestionType(question: number): void {
    this.playerService.setModal(true)
    const actualCategory = this.categoryType
    let category = question
    if (question === 50) {
      do {
        const tmp = randomFromArray(this.categories)
        category = tmp.id
      } while (actualCategory === category)
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
        const tmp = randomFromArray(this.countryCategory)
        this.questionType = tmp.id
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
      case 8: {
        this.questionType = this.famousPeople.id
        break
      }
      case 9: {
        this.questionType = this.countryInputCategory.id
        break
      }
      case 10: {
        this.questionType = this.familiada.id
        break
      }
      case 11: {
        this.questionType = this.writtingCategory.id
        break
      }
      case 12: {
        this.questionType = this.footballCross.id
        break
      }
      default: {
        break
      }
    }
  }
}
