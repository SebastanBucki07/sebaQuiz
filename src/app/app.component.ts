import {Component} from '@angular/core';
import {Category} from "./categories/categories.component";
import {QuestionTypesService} from "./question-types.service";
import {Player} from "./players/players.component";
import {PlayersService} from "./players.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'seba Quiz';
  questionType: number;
  categories: Category[] = []
  players: Player[] = []
  categoriesId: number[] = []

  async ngOnInit(): Promise<void> {
    this.questionType = -1
  }

  constructor(public categoryService: QuestionTypesService,
              public playerService: PlayersService) {
    this.questionType = -1
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
    const actualQuestion = this.questionType
      if (question === 50) {
        do{
          const tmp = Math.floor(Math.random() * this.categories.length)
          this.questionType = this.categories[tmp].id
        }while (this.questionType === actualQuestion)
      } else {
        this.questionType = question
      }
  }



}

