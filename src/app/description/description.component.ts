import {Component, OnInit} from '@angular/core';
import {DescriptionModel} from "../model/description-model";
import {PlayersService} from "../players.service";
import {QuestionDataService} from "../question-data.service";
import {TimerService} from "../timer.service";

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
    private questionDataService: QuestionDataService,
    private timerService: TimerService,
    public playerService: PlayersService
  ) {
  }

  getQuestion(category: string) {
    switch (category) {
      case 'movie': {
        this.random1 = this.questionDataService.getMoviesDescriptionQuestion()
        this.question = 'Co to za film?'
        this.points = 2
        break
      }
      case 'serial': {
        this.random1 = this.questionDataService.getSerialsDescriptionQuestion()
        this.question = 'Co to za serial?'
        this.points = 2
        break
      }
      case 'game': {
        this.random1 = this.questionDataService.getGamesDescriptionQuestion()
        this.question = 'Co to za gra'
        this.points = 2
        break
      }
      case 'district': {
        this.random1 = this.questionDataService.getDistrictsDescriptionQuestion()
        this.question = 'Z jakiego jestem województwa?'
        this.points = 3
        break
      }
      case 'stadium': {
        this.random1 = this.questionDataService.getStadiumQuestion()
        this.question = 'Jakiego klubu/reprezentacji jestem stadionem?'
        this.points = 3
        break
      }
      case 'proverb': {
        this.random1 = this.questionDataService.getProverbQuestion()
        this.question = 'Dokończ przysłowie'
        this.points = 2
        break
      }
      case 'history': {
        this.random1 = this.questionDataService.getHistoryQuestion()
        this.question = 'Podaj datę'
        this.points = 3
        break
      }
      case 'chemistSymbol': {
        this.random1 = this.questionDataService.getChemistQuestion()
        this.question = 'Jaki to pierwiastek?'
        this.points = 3
        break
      }
      case 'biology': {
        this.random1 = this.questionDataService.getBiologyQuestion()
        this.question = 'Co to jest?'
        this.points = 3
        break
      }
      case 'gods': {
        this.random1 = this.questionDataService.getGodsQuestion()
        this.question = 'O kogo/ o co chodzi?'
        this.points = 3
        break
      }
      case 'football': {
        this.random1 = this.questionDataService.getFootballQuestion()
        this.question = 'Podaj Reprezentacje lub klub lub zawodnika'
        this.points = 2
        break
      }
      default: {
        break;
      }
    }
    this.timerService.setTimer(1)
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

@Component({
  selector: 'app-stadium',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class StadiumsComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.getQuestion('stadium')
  }
}

@Component({
  selector: 'app-proverbs',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class ProverbsComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.getQuestion('proverb')
  }
}

@Component({
  selector: 'app-history',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class HistoryComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.getQuestion('history')
  }
}

@Component({
  selector: 'app-chemistSymbol',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class ChemistSymbolComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.getQuestion('chemistSymbol')
  }
}

@Component({
  selector: 'app-biology',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class BiologyComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.getQuestion('biology')
  }
}

@Component({
  selector: 'app-gods',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class GodsComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.getQuestion('gods')
  }
}

@Component({
  selector: 'app-football',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class FootballComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.getQuestion('football')
  }
}
