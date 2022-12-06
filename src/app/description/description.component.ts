import {Component, OnInit} from '@angular/core';
import {DescriptionModel} from "../model/description-model";
import {PlayersService} from "../players.service";
import {DescriptionQuestionService} from "../description-question.service";

@Component({
  template: ''
})
export abstract class DescriptionComponent {
  public random1: DescriptionModel | any = {}
  public points: number = 2
  public question: string = ''
  public isVisible = false;
  public isModalVisible = false;
  public tip: string = ''
  public answer: string = ''

  constructor(
    private descriptionQuestionService: DescriptionQuestionService,
    public playerService: PlayersService
  ) {
  }

  getQuestion(category: string) {
    switch (category) {
      case 'movie': {
        this.random1 = this.descriptionQuestionService.getMoviesDescriptionQuestion()
        this.question = 'Co to za film?'
        this.points = 2
        break
      }
      case 'serial': {
        this.random1 = this.descriptionQuestionService.getSerialsDescriptionQuestion()
        this.question = 'Co to za serial?'
        this.points = 2
        break
      }
      case 'game': {
        this.random1 = this.descriptionQuestionService.getGamesDescriptionQuestion()
        this.question = 'Co to za gra'
        this.points = 2
        break
      }
      case 'district': {
        this.random1 = this.descriptionQuestionService.getDistrictsDescriptionQuestion()
        this.question = 'Z jakiego jestem województwa?'
        this.points = 3
        break
      }
      default: {
        break;
      }
    }
    this.tip = this.random1.description
    this.answer = this.random1.title
    this.isModalVisible = true;
  }

  close() {
    this.isVisible = false;
    this.isModalVisible = false
    this.answer = ''
    this.playerService.nextPlayer()
  }

  showAnswer() {
    this.isVisible = !this.isVisible;
  }
}

@Component({
  selector: 'app-movies',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class MoviesComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.getQuestion('movie')
  }
}

@Component({
  selector: 'app-serials',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class SerialsComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.getQuestion('serial')
  }
}

@Component({
  selector: 'app-games',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class GamesComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.getQuestion('game')
  }
}

@Component({
  selector: 'app-districts',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DistrictsComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.getQuestion('district')
  }
}
