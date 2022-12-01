import {Component, OnInit} from '@angular/core';
import {Category, FragmentsModel} from "../model/fragments-model";
import {FragmentBuilder} from "../builder/fragment-builder";
import {PlayersService} from "../players.service";

@Component({
  template: ''
})
export abstract class Fragments {
  public random1: FragmentsModel = new FragmentBuilder(Category.SONG).build();
  public points: number = 1
  public multiply = 3
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

  constructor(public playerService: PlayersService) {

  }

  getQuestion(category: Category) {
    this.random1 = new FragmentBuilder(category).randomDataFromArray(1)
    this.showQuestion1()
    this.question = 'Podaj tytuł i autora'
    this.answer2 = this.random1.author;
    this.answer1 = this.random1.title;
    this.question1 = this.random1.fragment1;
    this.question2 = this.random1.fragment2;
    this.question3 = this.random1.fragment3;
    this.isModalVisible = true;
  }

  showAnswer1() {
    this.isAnswer1Visible = !this.isAnswer1Visible;
  }

  showAnswer2() {
    this.isAnswer2Visible = !this.isAnswer2Visible;
  }

  showQuestion1() {
    this.isQuestion1Visible = !this.isQuestion1Visible;
  }

  showQuestion2() {
    this.isQuestion1Visible = false;
    this.isQuestion2Visible = !this.isQuestion2Visible;

  }

  showQuestion3() {
    this.isQuestion2Visible = false;
    this.isQuestion3Visible = !this.isQuestion3Visible;
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
    this.question = ''
    this.question1 = ''
    this.question2 = ''
    this.question3 = ''
    this.answer1 = ''
    this.answer2 = ''
    this.playerService.nextPlayer()
  }
}

@Component({
  selector: 'app-songs',
  templateUrl: './fragments.component.html',
  styleUrls: ['./fragments.component.css']
})
export class SongsComponent extends Fragments implements OnInit {
  ngOnInit(): void {
    this.random1 = new FragmentBuilder(Category.SONG).build()
    this.getQuestion(Category.SONG)
  }

}

@Component({
  selector: 'app-books',
  templateUrl: './fragments.component.html',
  styleUrls: ['./fragments.component.css']
})
export class BooksComponent extends Fragments implements OnInit {
  ngOnInit(): void {
    this.random1 = new FragmentBuilder(Category.LECTURE).build()
    this.getQuestion(Category.LECTURE)
  }

}
