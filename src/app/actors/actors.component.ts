import {Component, OnInit} from '@angular/core';
import {PhotoModel} from "../model/photo-model";
import actors from "../../assets/photos/famousPeople.json"
import {PlayersService} from "../players.service";
import {ActorsQuestionService} from "../actors-question.service";
import {ActorModel} from "../model/actor-model";

@Component({
  template: ''
})
export abstract class ActorsComponent {
  public random1: ActorModel | any = {}
  public isVisible = false;
  public isModalVisible = false;
  public question: string = ''
  public answer: string = ''
  public photosData: PhotoModel[] = actors
  public photos: PhotoModel[] = []
  public tips: string[] = []
  public points:number = 2

  constructor(
    private actorsQuestionService: ActorsQuestionService,
    public playerService: PlayersService
  ) {
  }

  close() {
    this.isVisible = false;
    this.isModalVisible = false
    this.question = ''
    this.answer = ''
    this.photos = []
  }

  showAnswer() {
    this.isVisible = !this.isVisible;
  }

  getPhoto(name: string) {
    const actor = this.photosData.find(el => el.name == name)
    if (actor !== undefined) {
      this.photos.push(actor)
    }
    else if (actor === "Brak danych") {
      this.photos.push({
        id: 901,
        name: name,
        photo: "https://icon-library.com/images/no-data-icon/no-data-icon-10.jpg"
      })
    } else {
      this.photos.push({
        id: 901,
        name: name,
        photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      })
    }
  }

  getAllPhotos(tips: string[]) {
    tips.forEach(tip => {
      this.getPhoto(tip)
    })
    this.photos.forEach(el => {
      const index = this.tips.indexOf(el.name)
      this.tips.slice(index, 1)
    })
  }

  getQuestion(category: string) {
    switch (category) {
      case 'movieActors': {
        this.random1 = this.actorsQuestionService.getMoviesActorsQuestion()
        this.question = 'W jakim filmie była taka obsada?'
        this.points = 2
        break
      }
      case 'serialsActors': {
        this.random1 = this.actorsQuestionService.getSerialsActorsQuestion()
        this.question = 'W jakim serialu była taka obsada?'
        this.points = 2
        break
      }
      default: {
        break;
      }
    }
    this.answer = this.random1.title
    this.isModalVisible = true;
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
}

@Component({
  selector: 'app-movieActors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class MoviesActorsComponent extends ActorsComponent implements OnInit {
  ngOnInit(): void {
    this.getQuestion('movieActors')
  }
}

@Component({
  selector: 'app-serialsActors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class SerialsActorsComponent extends ActorsComponent implements OnInit {
  ngOnInit(): void {
    this.getQuestion('serialsActors')
  }
}
