import {Component, OnInit} from '@angular/core';
import {PlayersService} from "../players.service";
import {PhotoModel} from "../model/photo-model";
import {QuestionDataService} from "../question-data.service";
import {TimerService} from "../timer.service";
import {Subscription} from "rxjs";

@Component({
  template: ''
})
export abstract class PhotosComponent {
  private subscription: Subscription | any;
  public random1: PhotoModel | any = {}
  public points: number = 2
  public question: string = ''
  public category = ''
  public isVisible = false
  public tip: string = ''
  public isFlague = false
  public answer: string = ''

  constructor(
    public questionDataService: QuestionDataService,
    public timerService: TimerService,
    public playerService: PlayersService,
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
      case 'famousPeople': {
        this.random1 = this.questionDataService.getFamousPeoplePhotoQuestion()
        this.question = 'Kim jest osoba ze zdjęcia?'
        this.points = 2
        break
      }
      case 'buildings': {
        this.random1 = this.questionDataService.getBuildingsPhotoQuestion()
        this.question = 'Jak nazywa sie budowla ze zdjęcia?'
        this.points = 2
        break
      }
      case 'flagues': {
        this.random1 = this.questionDataService.getCountries('countriesForFlags');
        this.question = 'Z jakiego kraju jest ta flaga?'
        this.isFlague = true
        this.points = 2
        break
      }
      default: {
        break;
      }
    }
    this.timerService.setTimer(0.5)
    this.tip = this.random1.photo
    this.answer = this.random1.name
  }

  close() {
    this.isVisible = false;
    this.isFlague = false
    this.question = ''
    this.answer = ''
    this.playerService.nextPlayer()
    this.init()
    this.playerService.setModal(false)
    this.timerService.setTimer(0.5)
    this.timerService.timeout=false
  }

  showAnswer() {
    this.isVisible = !this.isVisible;
    this.subscription.unsubscribe()
    this.timerService.resetTimeout()
  }
}

@Component({
  selector: 'app-famouspeople',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
  providers: [TimerService]
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
  providers: [TimerService]
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
  providers: [TimerService]
})
export class FlaguesComponent extends PhotosComponent implements OnInit {
  ngOnInit(): void {
    this.category = 'flagues'
    this.init()
  }
}
