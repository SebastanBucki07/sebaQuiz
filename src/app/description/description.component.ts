import { Component, OnInit } from '@angular/core'
import { DescriptionModel } from '../model/description-model'
import { PlayersService } from '../players.service'
import { QuestionDataService } from '../question-data.service'
import { TimerService } from '../timer.service'
import { QuestionAndAnswerService } from '../question-and-answer.service'
import { QuestionTypesService } from '../question-types.service'

@Component({
  template: '',
})
export abstract class DescriptionComponent {
  public random1: DescriptionModel | any = {}
  public category = ''
  public isVisible = false

  constructor(
    private questionDataService: QuestionDataService,
    private questionTypeService: QuestionTypesService,
    private questionAnswerService: QuestionAndAnswerService,
    public timerService: TimerService,
    public playerService: PlayersService
  ) {}

  init(): void {
    this.getQuestion()
  }

  getQuestion(): void {
    switch (this.category) {
      case 'movie': {
        this.random1 = this.questionDataService.getMoviesDescriptionQuestion()
        this.questionAnswerService.setQuestion('Co to za film?')
        this.questionAnswerService.setAnswer(this.random1.title)
        this.questionAnswerService.setPointsForQuestion(2)
        break
      }
      case 'serial': {
        this.random1 = this.questionDataService.getSerialsDescriptionQuestion()
        this.questionAnswerService.setQuestion('Co to za serial?')
        this.questionAnswerService.setAnswer(this.random1.title)
        this.questionAnswerService.setPointsForQuestion(2)
        break
      }
      case 'game': {
        this.random1 = this.questionDataService.getGamesDescriptionQuestion()
        this.questionAnswerService.setQuestion('Co to za gra')
        this.questionAnswerService.setAnswer(this.random1.title)
        this.questionAnswerService.setPointsForQuestion(2)
        break
      }
      case 'district': {
        this.random1 = this.questionDataService.getDistrictsDescriptionQuestion()
        this.questionAnswerService.setQuestion('Z jakiego jestem województwa?')
        this.questionAnswerService.setAnswer(this.random1.title)
        this.questionAnswerService.setPointsForQuestion(3)
        break
      }
      case 'stadium': {
        this.random1 = this.questionDataService.getStadiumQuestion()
        this.questionAnswerService.setQuestion('Jakiego klubu/reprezentacji jestem stadionem?')
        this.questionAnswerService.setAnswer(this.random1.title)
        this.questionAnswerService.setPointsForQuestion(3)
        break
      }
      case 'proverb': {
        this.random1 = this.questionDataService.getProverbQuestion()
        this.questionAnswerService.setQuestion('Dokończ przysłowie')
        this.questionAnswerService.setAnswer(this.random1.title)
        this.questionAnswerService.setPointsForQuestion(2)
        break
      }
      case 'history': {
        this.random1 = this.questionDataService.getHistoryQuestion()
        this.questionAnswerService.setQuestion('Podaj datę')
        this.questionAnswerService.setAnswer(this.random1.title)
        this.questionAnswerService.setPointsForQuestion(3)
        break
      }
      case 'chemistSymbol': {
        this.random1 = this.questionDataService.getChemistQuestion()
        this.questionAnswerService.setQuestion('Jaki to pierwiastek?')
        this.questionAnswerService.setAnswer(this.random1.title)
        this.questionAnswerService.setPointsForQuestion(3)
        break
      }
      case 'biology': {
        this.random1 = this.questionDataService.getBiologyQuestion()
        this.questionAnswerService.setQuestion('Co to jest?')
        this.questionAnswerService.setAnswer(this.random1.title)
        this.questionAnswerService.setPointsForQuestion(3)
        break
      }
      case 'gods': {
        this.random1 = this.questionDataService.getGodsQuestion()
        this.questionAnswerService.setQuestion('O kogo/ o co chodzi?')
        this.questionAnswerService.setAnswer(this.random1.title)
        this.questionAnswerService.setPointsForQuestion(3)
        break
      }
      case 'football': {
        this.random1 = this.questionDataService.getFootballQuestion()
        this.questionAnswerService.setQuestion('Podaj Reprezentacje lub klub lub zawodnika')
        this.questionAnswerService.setAnswer(this.random1.title)
        this.questionAnswerService.setPointsForQuestion(2)
        break
      }
      case 'capitals': {
        this.random1 = this.questionDataService.getCountries('countriesForCapitals')
        this.questionAnswerService.setQuestion(`Jaka jest stolica ${this.random1.name}`)
        this.questionAnswerService.setAnswer(this.random1.capital)
        this.questionAnswerService.setPointsForQuestion(2)
        break
      }
      default: {
        break
      }
    }
    this.timerService.setTimer(0.5)
    this.questionAnswerService.setTip(this.random1.description)
  }

  close(): void {
    this.playerService.nextPlayer()
    this.questionTypeService.setActiveCategory(-1)
    this.questionAnswerService.setTip('')
  }
}

@Component({
  selector: 'app-movies',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
  providers: [TimerService],
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
  styleUrls: ['./description.component.css'],
  providers: [TimerService],
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
  styleUrls: ['./description.component.css'],
  providers: [TimerService],
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
  styleUrls: ['./description.component.css'],
  providers: [TimerService],
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
  styleUrls: ['./description.component.css'],
  providers: [TimerService],
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
  styleUrls: ['./description.component.css'],
  providers: [TimerService],
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
  styleUrls: ['./description.component.css'],
  providers: [TimerService],
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
  styleUrls: ['./description.component.css'],
  providers: [TimerService],
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
  styleUrls: ['./description.component.css'],
  providers: [TimerService],
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
  styleUrls: ['./description.component.css'],
  providers: [TimerService],
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
  styleUrls: ['./description.component.css'],
  providers: [TimerService],
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
  styleUrls: ['./description.component.css'],
  providers: [TimerService],
})
export class CapitalsComponent extends DescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'capitals'
    this.init()
  }
}
