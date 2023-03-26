import {Component, OnInit} from '@angular/core';
import {DescriptionModel} from "../model/description-model";
import {PlayersService} from "../players.service";
import {QuestionDataService} from "../question-data.service";
import {TimerService} from "../timer.service";
import {Subscription} from "rxjs";

@Component({
  template: '',
  providers: [TimerService]
})
export abstract class DescriptionComponent {
  private subscription: Subscription | any;
  public random1: DescriptionModel | any = {}
  public points: number = 2
  public question: string = ''
  public category = ''
  public isVisible = false;
  public isModalVisible = false;
  public tip: string = ''
  public answer: string = ''

  constructor(
    private questionDataService: QuestionDataService,
    public timerService: TimerService,
    public playerService: PlayersService
  ) {
  }

  init(){
    this.getQuestion()
  }

  getQuestion() {
    this.subscription = this.timerService.getBooleean()
      .subscribe(x => {
        if(x){
          this.isVisible = true
        }
      })
    switch (this.category) {
      case 'movie': {
        this.random1 = this.questionDataService.getMoviesDescriptionQuestion()
        this.question = 'Co to za film?'
        this.answer = this.random1.title
        this.points = 2
        break
      }
      case 'serial': {
        this.random1 = this.questionDataService.getSerialsDescriptionQuestion()
        this.question = 'Co to za serial?'
        this.answer = this.random1.title
        this.points = 2
        break
      }
      case 'game': {
        this.random1 = this.questionDataService.getGamesDescriptionQuestion()
        this.question = 'Co to za gra'
        this.answer = this.random1.title
        this.points = 2
        break
      }
      case 'district': {
        this.random1 = this.questionDataService.getDistrictsDescriptionQuestion()
        this.question = 'Z jakiego jestem województwa?'
        this.answer = this.random1.title
        this.points = 3
        break
      }
      case 'stadium': {
        this.random1 = this.questionDataService.getStadiumQuestion()
        this.question = 'Jakiego klubu/reprezentacji jestem stadionem?'
        this.answer = this.random1.title
        this.points = 3
        break
      }
      case 'proverb': {
        this.random1 = this.questionDataService.getProverbQuestion()
        this.question = 'Dokończ przysłowie'
        this.answer = this.random1.title
        this.points = 2
        break
      }
      case 'history': {
        this.random1 = this.questionDataService.getHistoryQuestion()
        this.question = 'Podaj datę'
        this.answer = this.random1.title
        this.points = 3
        break
      }
      case 'chemistSymbol': {
        this.random1 = this.questionDataService.getChemistQuestion()
        this.question = 'Jaki to pierwiastek?'
        this.answer = this.random1.title
        this.points = 3
        break
      }
      case 'biology': {
        this.random1 = this.questionDataService.getBiologyQuestion()
        this.question = 'Co to jest?'
        this.answer = this.random1.title
        this.points = 3
        break
      }
      case 'gods': {
        this.random1 = this.questionDataService.getGodsQuestion()
        this.question = 'O kogo/ o co chodzi?'
        this.answer = this.random1.title
        this.points = 3
        break
      }
      case 'football': {
        this.random1 = this.questionDataService.getFootballQuestion()
        this.question = 'Podaj Reprezentacje lub klub lub zawodnika'
        this.answer = this.random1.title
        this.points = 2
        break
      }
      case 'capitals': {
        this.random1 = this.questionDataService.getCountries('countriesForCapitals')
        this.question = `Jaka jest stolica ${this.random1.name}`
        this.answer = this.random1.capital
        this.points = 2
        break
      }
      default: {
        break;
      }
    }
    this.timerService.setTimer(0.15)
    this.tip = this.random1.description
    this.isModalVisible = true;
  }

  close() {
    this.isVisible = false;
    this.question = ''
    this.answer = ''
    this.playerService.nextPlayer()
    this.init()
    this.playerService.setModal(false)
    this.timerService.setTimer(0.15)
    this.timerService.timeout=false
  }

  showAnswer() {

    this.isVisible = !this.isVisible;
    this.subscription.unsubscribe()
    this.timerService.resetTimeout()
  }
}

@Component({
  selector: 'app-movies',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class MoviesComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'movie'
    this.init()
  }
}

@Component({
  selector: 'app-serials',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class SerialsComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'serial'
    this.init()
  }
}

@Component({
  selector: 'app-games',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class GamesComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'game'
    this.init()
  }
}

@Component({
  selector: 'app-districts',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DistrictsComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'district'
    this.init()
  }
}

@Component({
  selector: 'app-stadium',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class StadiumsComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'stadium'
    this.init()
  }
}

@Component({
  selector: 'app-proverbs',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class ProverbsComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'proverb'
    this.init()
  }
}

@Component({
  selector: 'app-history',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class HistoryComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'history'
    this.init()
  }
}

@Component({
  selector: 'app-chemistSymbol',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class ChemistSymbolComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'chemistSymbol'
    this.init()
  }
}

@Component({
  selector: 'app-biology',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class BiologyComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'biology'
    this.init()
  }
}

@Component({
  selector: 'app-gods',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class GodsComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'gods'
    this.init()
  }
}

@Component({
  selector: 'app-football',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class FootballComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'football'
    this.init()
  }
}

@Component({
  selector: 'app-capitals',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class CapitalsComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'capitals'
    this.init()
  }
}
