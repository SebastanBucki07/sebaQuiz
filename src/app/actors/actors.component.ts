import { Component, OnInit } from '@angular/core'
import { PhotoModel } from '../model/photo-model'
import actors from '../../assets/photos/famousPeople.json'
import { PlayersService } from '../players.service'
import { ActorModel } from '../model/actor-model'
import { QuestionDataService } from '../question-data.service'
import { TimerService } from '../timer.service'
import { QuestionTypesService } from '../question-types.service'
import { QuestionAndAnswerService } from '../question-and-answer.service'
import { getAllActorsPhotos } from '../helper/images/images.helper'

@Component({
  template: '',
})
export abstract class ActorsComponent {
  public randomActorForQuestion: ActorModel | any = {}
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
    this.photos = []
    this.playerService.nextPlayer()
    this.questionTypeService.setActiveCategory(-1)
  }

  async getQuestion(): Promise<void> {
    switch (this.category) {
      case 'movieActors': {
        this.randomActorForQuestion = await this.questionDataService.getMoviesActorsQuestion()
        this.questionAnswerService.setQuestion('W jakim filmie była taka obsada?')
        this.questionAnswerService.setAnswer(this.randomActorForQuestion.title)
        this.questionAnswerService.setPointsForQuestion(2)
        break
      }
      case 'serialsActors': {
        this.randomActorForQuestion = this.questionDataService.getSerialsActorsQuestion()
        this.questionAnswerService.setQuestion('W jakim serialu była taka obsada?')
        this.questionAnswerService.setAnswer(this.randomActorForQuestion.title)
        this.questionAnswerService.setPointsForQuestion(2)
        break
      }
      default: {
        break
      }
    }
    this.photos = await getAllActorsPhotos(this.randomActorForQuestion.actors)
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
