import { Component, OnInit } from '@angular/core'
import { PlayersService } from '../players.service'
import { PhotoModel } from '../model/photo-model'
import { QuestionDataService } from '../question-data.service'
import { TimerService } from '../timer.service'
import { QuestionTypesService } from '../question-types.service'
import { QuestionAndAnswerService } from '../question-and-answer.service'

@Component({
  template: '',
})
export abstract class PhotosComponent {
  protected randomPhoto: PhotoModel | any = {}
  protected category = ''
  protected tip = ''

  constructor(
    private questionDataService: QuestionDataService,
    private questionTypeService: QuestionTypesService,
    private questionAnswerService: QuestionAndAnswerService,
    public timerService: TimerService,
    protected playerService: PlayersService
  ) {}

  init(): void {
    this.getQuestion()
  }

  getQuestion(): void {
    switch (this.category) {
      case 'famousPeople': {
        this.randomPhoto = this.questionDataService.getFamousPeoplePhotoQuestion()
        this.questionAnswerService.setQuestion('Kim jest osoba ze zdjęcia?')
        this.questionAnswerService.setTip(this.randomPhoto.photo)
        break
      }
      case 'buildings': {
        this.randomPhoto = this.questionDataService.getBuildingsPhotoQuestion()
        this.questionAnswerService.setQuestion('Jak nazywa sie budowla ze zdjęcia?')
        this.questionAnswerService.setTip(this.randomPhoto.photo)
        break
      }
      case 'flagues': {
        this.randomPhoto = this.questionDataService.getCountries('countriesForFlags')
        this.questionAnswerService.setQuestion('Z jakiego kraju jest ta flaga?')
        this.questionAnswerService.setTip(this.randomPhoto.code.toLowerCase())
        this.questionAnswerService.setIsFlague(true)
        break
      }
      default: {
        break
      }
    }
    this.questionAnswerService.setPointsForQuestion(2)
    this.questionAnswerService.setIsPhoto(true)
    this.timerService.setTimer(0.5)
    this.questionAnswerService.setAnswer(this.randomPhoto.name)
  }

  close(): void {
    this.playerService.nextPlayer()
    this.questionTypeService.setActiveCategory(-1)
    this.questionAnswerService.setTip('')
    this.questionAnswerService.setIsPhoto(false)
    this.questionAnswerService.setIsFlague(false)
  }
}

@Component({
  selector: 'app-famouspeople',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
  providers: [TimerService],
})
export class FamousPeopleComponent extends PhotosComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'famousPeople'
    this.init()
  }
}

@Component({
  selector: 'app-buildings',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
  providers: [TimerService],
})
export class BuildingsComponent extends PhotosComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'buildings'
    this.init()
  }
}

@Component({
  selector: 'app-flagues',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
  providers: [TimerService],
})
export class FlaguesComponent extends PhotosComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'flagues'
    this.init()
  }
}
