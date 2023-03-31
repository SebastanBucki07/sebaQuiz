import { Component, OnInit } from '@angular/core'
import { QuestionDataService } from '../question-data.service'
import { PlayersService } from '../players.service'
import { FamiliadaAnswer, FamiliadaModel } from '../model/familiada-model'
import { PlayerForFamiliada } from '../players/players.component'
import { TimerService } from '../timer.service'
import { Subscription } from 'rxjs'
import { formatStrings } from '../../common/string.helper'

@Component({
  selector: 'app-familiada',
  templateUrl: './familiada.component.html',
  styleUrls: ['./familiada.component.css'],
  providers: [TimerService],
})
export class FamiliadaComponent implements OnInit {
  public random1: FamiliadaModel | any = {}
  public question = ''
  public userAnswer = ''
  public isVisible = false
  public answers: FamiliadaAnswer[] = []
  public players: PlayerForFamiliada[] = []
  public actualPlayer: PlayerForFamiliada | any = null
  public winner: PlayerForFamiliada | any = null
  public correct = 0
  public points = 0
  public wrong = 0
  public blockedButton = false
  private subscription: Subscription | any

  constructor(
    private questionDataService: QuestionDataService,
    public timerService: TimerService,
    public playerService: PlayersService
  ) {}

  ngOnInit(): void {
    this.init()
  }

  setPlayersForFamiliada() {
    if (this.players.length >= 1) {
      this.players = []
    }
    const tmp = this.playerService.getPlayers()
    tmp.forEach((player) => {
      this.players.push({
        id: player.id,
        name: player.name,
        wrong: 0,
      })
    })
    const playerIndex = this.players.findIndex((el) => el.id === this.playerService.actualPlayer)
    this.setActualPlayer(this.players[playerIndex])
  }

  setActualPlayer(player: PlayerForFamiliada) {
    this.actualPlayer = player
  }

  init() {
    this.subscription = this.timerService.getBooleean().subscribe((x) => {
      if (x) {
        this.setWrong()
        this.nextPlayer()
        this.timerService.timeout = false
      }
    })
    this.correct = 0
    this.wrong = 0
    this.isVisible = false
    this.setPlayersForFamiliada()
    this.points = 5
    this.random1 = this.questionDataService.getFamiliadaQuestion()
    this.setAnswers()
    this.timerService.setTimer(0.5)
    this.timerService.timeout = false
  }

  close() {
    this.playerService.setModal(false)
    this.winner = null
    this.userAnswer = ''
    this.answers = []
    this.blockedButton = false
    this.playerService.nextPlayer()
    this.timerService.timeout = false
    this.subscription.unsubscribe()
    this.init()
  }

  showAnswer() {
    if (this.answers.length > 0) {
      this.answers.forEach((answer) => {
        answer.display = true
      })
    }
    this.isVisible = true
    this.blockedButton = true
  }

  setAnswers() {
    this.question = this.random1.question
    if (this.random1.answer1 != '-') {
      this.answers.push({
        id: 1,
        answer: this.random1.answer1.toLowerCase(),
        display: false,
      })
    }
    if (this.random1.answer2 != '-') {
      this.answers.push({
        id: 2,
        answer: this.random1.answer2.toLowerCase(),
        display: false,
      })
    }
    if (this.random1.answer3 != '-') {
      this.answers.push({
        id: 3,
        answer: this.random1.answer3.toLowerCase(),
        display: false,
      })
    }
    if (this.random1.answer4 != '-') {
      this.answers.push({
        id: 4,
        answer: this.random1.answer4.toLowerCase(),
        display: false,
      })
    }
    if (this.random1.answer5 != '-') {
      this.answers.push({
        id: 5,
        answer: this.random1.answer5.toLowerCase(),
        display: false,
      })
    }
    if (this.random1.answer6 != '-') {
      this.answers.push({
        id: 6,
        answer: this.random1.answer6.toLowerCase(),
        display: false,
      })
    }
  }

  setWrong() {
    const audio = new Audio('../../assets/mp3/wrong.mp3')
    audio.play()
    audio.playbackRate = 1.2
    this.actualPlayer.wrong++
  }

  save() {
    const input = document.getElementById('userAnswer') as HTMLInputElement
    const value = input.value.toString()
    if (input != null) {
      let tmp = this.answers.findIndex((el) => formatStrings(el.answer) === formatStrings(value))
      if (tmp !== -1) {
        if (!this.answers[tmp].display) {
          this.answers[tmp].display = true
          this.userAnswer = ''
          const audio = new Audio('../../assets/mp3/correct.mp3')
          audio.play()
          audio.playbackRate = 1
        } else {
          this.setWrong()
        }
      } else {
        this.setWrong()
      }
      this.userAnswer = ''
      this.nextPlayer()
    }
  }

  nextPlayer() {
    this.timerService.setTimer(0.5)
    const indexofActualPlayer = this.players.indexOf(this.actualPlayer, 0)
    let nextPlayer = {}
    if (indexofActualPlayer + 1 === this.players.length) {
      nextPlayer = this.players[0]
    } else {
      nextPlayer = this.players[this.players.indexOf(this.actualPlayer) + 1]
    }
    if (this.actualPlayer.wrong >= 3) {
      const index = this.players.indexOf(this.actualPlayer, 0)
      if (index > -1) {
        this.players.splice(index, 1)
      }
    }
    if (this.players.length === 1) {
      this.setWinner()
      this.showAnswer()
    } else {
      this.actualPlayer = nextPlayer
    }
  }

  setWinner() {
    this.subscription.unsubscribe()
    this.timerService.resetTimeout()
    //this.timerService.setTimer(0)
    this.winner = this.players[0]
    this.blockedButton = true
    this.isVisible = true
    this.showAnswer()
  }
}
