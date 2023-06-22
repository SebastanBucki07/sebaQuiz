import { Component, OnInit } from '@angular/core'
import { PhotoModel } from '../model/photo-model'
import actors from '../../assets/photos/famousPeople.json'
import { PlayersService } from '../players.service'
import { ActorModel } from '../model/actor-model'
import { QuestionDataService } from '../question-data.service'
import { TimerService } from '../timer.service'
import { QuestionTypesService } from '../question-types.service'
import { QuestionAndAnswerService } from '../question-and-answer.service'

@Component({
  template: '',
})
export abstract class ActorsComponent {
  public random1: ActorModel | any = {}
  public isVisible = false
  public category = ''
  public photosData: PhotoModel[] = actors
  public photos: PhotoModel[] = []
  public tips: string[] = []

  constructor(
    private questionDataService: QuestionDataService,
    private questionTypeService: QuestionTypesService,
    private questionAnswerService: QuestionAndAnswerService,
    public playerService: PlayersService
  ) {}

  close(): void {
    this.playerService.nextPlayer()
    this.questionTypeService.setActiveCategory(-1)
  }

  getPhoto(name: string): void {
    const actor = this.photosData.find((el) => el.name == name)
    if (actor !== undefined) {
      this.photos.push(actor)
    } else {
      this.photos.push({
        id: 901,
        name: name,
        photo: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      })
    }
  }

  getAllPhotos(tips: string[]): void {
    tips.forEach((tip) => {
      this.getPhoto(tip)
    })
    this.photos.forEach((el) => {
      const index = this.tips.indexOf(el.name)
      this.tips.slice(index, 1)
    })
  }

  getQuestion(): void {
    switch (this.category) {
      case 'movieActors': {
        this.random1 = this.questionDataService.getMoviesActorsQuestion()
        this.questionAnswerService.setQuestion('W jakim filmie była taka obsada?')
        this.questionAnswerService.setPointsForQuestion(2)
        break
      }
      case 'serialsActors': {
        this.random1 = this.questionDataService.getSerialsActorsQuestion()
        this.questionAnswerService.setQuestion('W jakim serialu była taka obsada?')
        this.questionAnswerService.setPointsForQuestion(2)
        break
      }
      default: {
        break
      }
    }
    this.questionAnswerService.setAnswer(this.random1.title)
    this.tips = this.random1.actors
    this.getAllPhotos(this.tips)
  }

  init(): void {
    this.getQuestion()
  }
}

@Component({
  selector: 'app-movieActors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css'],
  providers: [TimerService],
})
export class MoviesActorsComponent extends ActorsComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'movieActors'
    this.init()
  }
}

@Component({
  selector: 'app-serialsActors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css'],
  providers: [TimerService],
})
export class SerialsActorsComponent extends ActorsComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'serialsActors'
    this.init()
  }
}
