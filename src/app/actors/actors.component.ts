import { Component, OnInit } from '@angular/core'
import { PhotoModel } from '../model/photo-model'
import actors from '../../assets/photos/famousPeople.json'
import { PlayersService } from '../players.service'
import { ActorModel } from '../model/actor-model'
import { QuestionDataService } from '../question-data.service'
import { TimerService } from '../timer.service'
import { Subscription } from 'rxjs'

@Component({
  template: '',
})
export abstract class ActorsComponent {
  public random1: ActorModel | any = {}
  private subscription: Subscription | any
  public isVisible = false
  public isModalVisible = false
  public question = ''
  public category = ''
  public answer = ''
  public photosData: PhotoModel[] = actors
  public photos: PhotoModel[] = []
  public tips: string[] = []
  public points = 2

  constructor(
    private questionDataService: QuestionDataService,
    public playerService: PlayersService,
    public timerService: TimerService
  ) {}

  close(): void {
    this.isVisible = false
    this.question = ''
    this.answer = ''
    this.playerService.nextPlayer()
    this.photos = []
    this.tips = []
    this.init()
    this.playerService.setModal(false)
  }

  showAnswer(): void {
    this.isVisible = !this.isVisible
    this.subscription.unsubscribe()
    this.timerService.resetTimeout()
  }

  getPhoto(name: string): void {
    const actor = this.photosData.find((el) => el.name == name)
    if (actor !== undefined) {
      this.photos.push(actor)
    } else if (actor === 'Brak danych') {
      this.photos.push({
        id: 901,
        name: name,
        photo: 'https://icon-library.com/images/no-data-icon/no-data-icon-10.jpg',
      })
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
    this.timerService.setTimer(0.5)
    this.subscription = this.timerService.getBooleean().subscribe((x) => {
      if (x) {
        this.isVisible = true
      }
    })
    switch (this.category) {
      case 'movieActors': {
        this.random1 = this.questionDataService.getMoviesActorsQuestion()
        this.question = 'W jakim filmie była taka obsada?'
        this.points = 2
        break
      }
      case 'serialsActors': {
        this.random1 = this.questionDataService.getSerialsActorsQuestion()
        this.question = 'W jakim serialu była taka obsada?'
        this.points = 2
        break
      }
      default: {
        break
      }
    }
    this.answer = this.random1.title
    this.playerService.setModal(true)
    this.tips.push(this.random1.actor1)
    this.tips.push(this.random1.actor2)
    this.tips.push(this.random1.actor3)
    this.tips.push(this.random1.actor4)
    this.tips.push(this.random1.actor5)
    this.tips.push(this.random1.actor6)
    this.tips.push(this.random1.actor7)
    this.tips.push(this.random1.actor8)
    this.tips.push(this.random1.actor9)
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
