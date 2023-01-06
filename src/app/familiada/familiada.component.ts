import {Component, OnInit} from '@angular/core';
import {QuestionDataService} from "../question-data.service";
import {PlayersService} from "../players.service";
import {FamiliadaAnswer, FamiliadaModel} from "../model/familiada-model";

@Component({
  selector: 'app-familiada',
  templateUrl: './familiada.component.html',
  styleUrls: ['./familiada.component.css']
})
export class FamiliadaComponent implements OnInit {
  public random1: FamiliadaModel | any = {}
  public userAnswer: string = ''
  public isVisible = false
  public answers: FamiliadaAnswer[] = []
  public correct: number = 0
  public points: number = 0
  public wrong: number = 0
  public blockedButton = false

  constructor(private questionDataService: QuestionDataService,
              public playerService: PlayersService) {
  }

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.isVisible = false
    this.random1 = this.questionDataService.getFamiliadaQuestion()
    this.setAnswers()
  }

  close() {
    this.playerService.setModal(false);
    this.userAnswer = ''
    this.correct = 0
    this.wrong = 0
    this.answers = []
    this.blockedButton = false
    this.playerService.nextPlayer()
    this.init()
  }

  countPoints(correct: number, allAnswers: number) {
    let percent = (correct / allAnswers) * 100
    if (percent === 100) {
      this.points = 6
    } else if ((percent < 100) && (percent >= 80)) {
      this.points = 5
    } else if ((percent < 80) && (percent >= 60)) {
      this.points = 4
    } else if ((percent < 60) && (percent >= 40)) {
      this.points = 3
    } else if ((percent < 40) && (percent >= 20)) {
      this.points = 2
    } else if ((percent < 20) && (percent > 0)) {
      this.points = 1
    } else {
      this.points = 0
    }
  }

  showAnswer() {
    if (this.answers.length > 0) {
      this.countPoints(this.correct, this.answers.length)
      this.answers.forEach((answer) => {
        answer.display = true
      })
    }
    this.isVisible = true
    this.blockedButton = true
  }

  setAnswers() {
    if (this.random1.answer1 != '-') {
      this.answers.push(
        {
          id: 1,
          answer: this.random1.answer1.toLowerCase(),
          display: false,
        })
    }
    if (this.random1.answer2 != '-') {
      this.answers.push(
        {
          id: 2,
          answer: this.random1.answer2.toLowerCase(),
          display: false,
        })
    }
    if (this.random1.answer3 != '-') {
      this.answers.push(
        {
          id: 3,
          answer: this.random1.answer3.toLowerCase(),
          display: false,
        })
    }
    if (this.random1.answer4 != '-') {
      this.answers.push(
        {
          id: 4,
          answer: this.random1.answer4.toLowerCase(),
          display: false,
        })
    }
    if (this.random1.answer5 != '-') {
      this.answers.push(
        {
          id: 5,
          answer: this.random1.answer5.toLowerCase(),
          display: false,
        })
    }
    if (this.random1.answer6 != '-') {
      this.answers.push(
        {
          id: 6,
          answer: this.random1.answer6.toLowerCase(),
          display: false,
        })
    }
  }

  setWrong() {
    const audio = new Audio("../../assets/mp3/wrong.mp3");
    audio.play();
    audio.playbackRate = 1.2;
    this.wrong++
    if (this.wrong === 3) {
      this.blockedButton = true
      this.showAnswer()
    }
  }

  save() {
    const input = document.getElementById('userAnswer') as HTMLInputElement | null;
    const value = input?.value;
    if (input != null) {
      let tmp = this.answers.findIndex(el => el.answer.toLowerCase() === value)
      if (tmp !== -1) {
        if (!this.answers[tmp].display) {
          this.answers[tmp].display = true;
          this.correct++
          this.userAnswer = ''
          const audio = new Audio("../../assets/mp3/correct.mp3");
          audio.play();
          audio.playbackRate = 1;
        } else {
          this.setWrong()
        }
      } else {
        this.setWrong()
      }
    }
  }

}
