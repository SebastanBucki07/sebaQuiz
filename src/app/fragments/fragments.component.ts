import {Component, OnInit} from '@angular/core';
import {Category, FragmentsModel} from "../model/fragments-model";
import {PlayersService} from "../players.service";
import {TimerService} from "../timer.service";
import {FragmentBuilder} from "../builder/fragment-builder";
import {Subscription} from "rxjs";

@Component({
  template: ''
})
export abstract class Fragments {
  private subscription: Subscription | any;
  public random1: FragmentsModel = new FragmentBuilder(Category.SONG).build();
  public points: number = 1
  public buttonText = ''
  public category:Category = Category.SONG
  public answerButtonText = ''
  public answerDescription = ''
  public multiply = 3
  public isTipQuestion = false
  public isAnswer1Visible = false;
  public isAnswer2Visible = false;
  public isModalVisible = false;
  public isQuestion1Visible = false;
  public isQuestion2Visible = false;
  public isQuestion3Visible = false;
  public question = ''
  public question1 = ''
  public question2 = ''
  public question3 = ''
  public answer1 = ''
  public answer2 = ''

  constructor(public playerService: PlayersService,
              public timerService: TimerService) {

  }

  init(){
    this.getQuestion()
  }

  getQuestion() {
    this.timerService.setTimer(0.5)
    this.subscription = this.timerService.getBooleean()
      .subscribe(x => {
        if(x){
          this.isAnswer1Visible = true
          this.isAnswer2Visible = true
        }
      })
    this.random1 = new FragmentBuilder(this.category).randomDataFromArray(1)
    if (this.category === Category.SONGTIPS ){
      this.isTipQuestion = true
      this.buttonText = 'piosenka'
      this.answerButtonText = 'Pokaż wykonawce'
      this.question = 'Podaj wykonawcę utworów'
      this.answerDescription = 'Wykonawca'
      this.answer1 = this.random1.author;
    }
    else if (this.category === Category.CITIES ){
      this.isTipQuestion = true
      this.buttonText = 'Miasto '
      this.answerButtonText = 'Pokaż Panstwo'
      this.question = 'Z jakiego Państwa są te miasta?'
      this.answerDescription = 'Panstwo'
      this.answer1 = this.random1.author;
    }
    else{
      this.buttonText = 'fragment'
      this.answerButtonText = 'Pokaż tytuł'
      this.question = 'Podaj tytuł i autora'
      this.answerDescription = 'Tytuł:'
      this.answer2 = this.random1.author;
      this.answer1 = this.random1.title;
    }
    this.showQuestion1()

    this.question1 = this.random1.fragment1;
    this.question2 = this.random1.fragment2;
    this.question3 = this.random1.fragment3;
    this.isModalVisible = true;
  }

  showAnswer1() {
    this.isAnswer1Visible = !this.isAnswer1Visible;
    this.subscription.unsubscribe()
    this.timerService.resetTimeout()
  }

  showAnswer2() {
    this.isAnswer2Visible = !this.isAnswer2Visible;
    this.subscription.unsubscribe()
    this.timerService.resetTimeout()
  }

  showQuestion1() {

    this.isQuestion1Visible = !this.isQuestion1Visible;
    this.timerService.setTimer(0.5)
  }

  showQuestion2() {
    this.isQuestion1Visible = false;
    this.isQuestion2Visible = !this.isQuestion2Visible;
    this.timerService.setTimer(0.5)

  }

  showQuestion3() {
    this.isQuestion2Visible = false;
    this.isQuestion3Visible = !this.isQuestion3Visible;
    this.timerService.setTimer(0.5)
  }

  setMultiply(multiply: number) {
    this.multiply = multiply
  }

  close() {
    this.setMultiply(1)
    this.isAnswer1Visible = false;
    this.isAnswer2Visible = false;
    this.isModalVisible = false;
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
    this.init()
    this.playerService.setModal(false)
    this.timerService.setTimer(0.5)
    this.timerService.timeout=false
  }
}

@Component({
  selector: 'app-songs',
  templateUrl: './fragments.component.html',
  styleUrls: ['./fragments.component.css'],
  providers: [TimerService]
})
export class SongsComponent extends Fragments implements OnInit {
  ngOnInit(): void {
    this.random1 = new FragmentBuilder(Category.SONG).build()
    this.category = Category.SONG
    this.init()
  }

}

@Component({
  selector: 'app-books',
  templateUrl: './fragments.component.html',
  styleUrls: ['./fragments.component.css'],
  providers: [TimerService]
})
export class BooksComponent extends Fragments implements OnInit {
  ngOnInit(): void {
    this.random1 = new FragmentBuilder(Category.LECTURE).build()
    this.category = Category.LECTURE
    this.init()
  }

}

@Component({
  selector: 'app-tips',
  templateUrl: './fragments.component.html',
  styleUrls: ['./fragments.component.css'],
  providers: [TimerService]
})
export class SongTipsComponent extends Fragments implements OnInit {
  ngOnInit(): void {
    this.random1 = new FragmentBuilder(Category.SONGTIPS).build()
    this.category = Category.SONGTIPS
    this.init()
  }

}

@Component({
  selector: 'app-cities-tips',
  templateUrl: './fragments.component.html',
  styleUrls: ['./fragments.component.css'],
  providers: [TimerService]
})
export class CitiesTipsComponent extends Fragments implements OnInit {
  ngOnInit(): void {
    this.random1 = new FragmentBuilder(Category.CITIES).build()
    this.category = Category.CITIES
    this.init()

  }

}
