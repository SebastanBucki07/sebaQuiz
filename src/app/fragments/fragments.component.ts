import { Component, OnInit } from '@angular/core'
import { Category, FragmentsModel } from '../model/fragments-model'
import { PlayersService } from '../players.service'
import { TimerService } from '../timer.service'
import { FragmentBuilder } from '../builder/fragment-builder'
import { Subscription } from 'rxjs'
import { QuestionDataService } from '../question-data.service'
import { QuestionTypesService } from '../question-types.service'
import { QuestionAndAnswerService } from '../question-and-answer.service'

@Component({
  template: '',
})
export abstract class Fragments {
  private subscription: Subscription | any
  protected randomFragmentQuestion: FragmentsModel = new FragmentBuilder(Category.SONG).build()
  protected buttonText = ''
  protected category: Category = Category.SONG
  protected answerButtonText = ''
  protected answerDescription = ''
  protected multiply = 3
  protected isTipQuestion = false
  protected isAnswer1Visible = false
  protected isAnswer2Visible = false
  protected isModalVisible = false
  protected isQuestion1Visible = false
  protected isQuestion2Visible = false
  protected isQuestion3Visible = false
  protected question = ''
  protected question1 = ''
  protected question2 = ''
  protected question3 = ''
  protected answer1 = ''
  protected answer2 = ''

  constructor(
    protected playerService: PlayersService,
    private questionDataService: QuestionDataService,
    private questionTypeService: QuestionTypesService,
    private questionAnswerService: QuestionAndAnswerService,
    public timerService: TimerService
  ) {}

  init(): void {
    this.getQuestion()
  }

  getQuestion(): void {
    this.timerService.setTimer(0.5)
    this.subscription = this.timerService.getBooleean().subscribe((x) => {
      if (x) {
        this.isAnswer1Visible = true
        this.isAnswer2Visible = true
      }
    })
    this.randomFragmentQuestion = new FragmentBuilder(this.category).randomDataFromArray(1)
    if (this.category === Category.SONGTIPS) {
      this.isTipQuestion = true
      this.buttonText = 'piosenka'
      this.answerButtonText = 'Pokaż wykonawce'
      this.question = 'Podaj wykonawcę utworów'
      this.answerDescription = 'Wykonawca'
      this.answer1 = this.randomFragmentQuestion.author
    } else if (this.category === Category.CITIES) {
      this.isTipQuestion = true
      this.buttonText = 'Miasto '
      this.answerButtonText = 'Pokaż Panstwo'
      this.question = 'Z jakiego Państwa są te miasta?'
      this.answerDescription = 'Panstwo'
      this.answer1 = this.randomFragmentQuestion.author
    } else {
      this.buttonText = 'fragment'
      this.answerButtonText = 'Pokaż tytuł'
      this.question = 'Podaj tytuł i autora'
      this.answerDescription = 'Tytuł:'
      this.answer2 = this.randomFragmentQuestion.author
      this.answer1 = this.randomFragmentQuestion.title
    }
    this.showQuestion1()

    this.question1 = this.randomFragmentQuestion.fragment1
    this.question2 = this.randomFragmentQuestion.fragment2
    this.question3 = this.randomFragmentQuestion.fragment3
    this.questionAnswerService.setWinner(this.playerService.actualPlayer)
  }

  showAnswer1(): void {
    this.isAnswer1Visible = !this.isAnswer1Visible
    this.subscription.unsubscribe()
    this.timerService.resetTimeout()
    this.questionAnswerService.setPointsForQuestion(this.multiply * 2)
  }

  showAnswer2(): void {
    this.isAnswer2Visible = !this.isAnswer2Visible
    this.subscription.unsubscribe()
    this.timerService.resetTimeout()
    this.questionAnswerService.setPointsForQuestion(this.multiply)
  }

  showQuestion1(): void {
    this.isQuestion1Visible = !this.isQuestion1Visible
    this.timerService.setTimer(0.5)
  }

  showQuestion2(): void {
    this.isQuestion1Visible = false
    this.isQuestion2Visible = !this.isQuestion2Visible
    this.timerService.setTimer(0.5)
  }

  showQuestion3(): void {
    this.isQuestion2Visible = false
    this.isQuestion3Visible = !this.isQuestion3Visible
    this.timerService.setTimer(0.5)
  }

  setMultiply(multiply: number): void {
    this.questionAnswerService.setPointsForQuestion(multiply)
    this.multiply = multiply
  }

  close(): void {
    this.setMultiply(3)
    this.isAnswer1Visible = false
    this.isAnswer2Visible = false
    this.isQuestion1Visible = false
    this.isQuestion2Visible = false
    this.isQuestion3Visible = false
    this.isTipQuestion = false
    this.question = ''
    this.question1 = ''
    this.question2 = ''
    this.question3 = ''
    this.answer1 = ''
    this.answer2 = ''
    this.playerService.nextPlayer()
    this.questionTypeService.setActiveCategory(-1)
    this.timerService.setTimer(0.5)
    this.timerService.timeout = false
  }
}

@Component({
  selector: 'app-songs',
  templateUrl: './fragments.component.html',
  styleUrls: ['./fragments.component.css'],
  providers: [TimerService],
})
export class SongsComponent extends Fragments implements OnInit {
  ngOnInit(): void {
    this.randomFragmentQuestion = new FragmentBuilder(Category.SONG).build()
    this.category = Category.SONG
    this.init()
  }
}

@Component({
  selector: 'app-books',
  templateUrl: './fragments.component.html',
  styleUrls: ['./fragments.component.css'],
  providers: [TimerService],
})
export class BooksComponent extends Fragments implements OnInit {
  ngOnInit(): void {
    this.randomFragmentQuestion = new FragmentBuilder(Category.LECTURE).build()
    this.category = Category.LECTURE
    this.init()
  }
}

@Component({
  selector: 'app-tips',
  templateUrl: './fragments.component.html',
  styleUrls: ['./fragments.component.css'],
  providers: [TimerService],
})
export class SongTipsComponent extends Fragments implements OnInit {
  ngOnInit(): void {
    this.randomFragmentQuestion = new FragmentBuilder(Category.SONGTIPS).build()
    this.category = Category.SONGTIPS
    this.init()
  }
}

@Component({
  selector: 'app-cities-tips',
  templateUrl: './fragments.component.html',
  styleUrls: ['./fragments.component.css'],
  providers: [TimerService],
})
export class CitiesTipsComponent extends Fragments implements OnInit {
  ngOnInit(): void {
    this.randomFragmentQuestion = new FragmentBuilder(Category.CITIES).build()
    this.category = Category.CITIES
    this.init()
  }
}
