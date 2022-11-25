import {Component} from '@angular/core';
import {Category} from "./categories/categories.component";
import {QuestionTypesService} from "./question-types.service";
import {Player} from "./players/players.component";
import {PlayersService} from "./players.service";
import {getRandomNumber} from "../common/randomize.helper";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'heroku-angular';
  questionType: number;
  categories: Category[] = []
  players: Player[] = []
  playersCopy: Player[] = []
  categoriesId: number[] = []
  actualPlayer: number = 0

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
    this.actualPlayer = getRandomNumber(this.players.length)
    this.playersCopy = this.players
  }

  setQuestionType(question: number) {
    if (question === 50) {
      const tmp = Math.floor(Math.random() * this.categories.length)
      this.questionType = this.categories[tmp].id
    } else {
      this.questionType = question
    }
  }

  nextPlayer() {
    if (this.actualPlayer >= this.players.length - 1) {
      this.actualPlayer = 0
    } else {
      this.actualPlayer = this.actualPlayer + 1
    }
  }

}

