import { Component, OnInit } from '@angular/core'
import { QuestionDataService } from '../question-data.service'
import { PlayersService } from '../players.service'
import { FamiliadaAnswer, FamiliadaModel } from '../model/familiada-model'
import { PlayerForFamiliada } from '../players/players.component'
import { TimerService } from '../timer.service'
import { Subscription } from 'rxjs'
import { formatStrings } from '../../common/string.helper'
import { QuestionTypesService } from '../question-types.service'
import { QuestionAndAnswerService } from '../question-and-answer.service'

@Component({
  selector: 'app-familiada',
  templateUrl: './familiada.component.html',
  styleUrls: ['./familiada.component.css'],
  providers: [TimerService],
})
export class FamiliadaComponent implements OnInit {
  protected randomFamiliadaQuestion: FamiliadaModel | any = {}
  protected question = ''
  protected userAnswer = ''
  protected isVisible = false
  protected answers: FamiliadaAnswer[] = []
  protected players: PlayerForFamiliada[] = []
  protected actualPlayer: PlayerForFamiliada | any = null
  protected winner: PlayerForFamiliada | any = null
  protected correct = 0
  protected wrong = 0
  protected blockedButton = false
  protected subscription: Subscription | any

  constructor(
    private questionDataService: QuestionDataService,
    private questionTypeService: QuestionTypesService,
    private questionAnswerService: QuestionAndAnswerService,
    public timerService: TimerService,
    protected playerService: PlayersService
  ) {}

  ngOnInit(): void {
    this.init()
  }

  setPlayersForFamiliada(): void {
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

  setActualPlayer(player: PlayerForFamiliada): void {
    this.actualPlayer = player
  }

  init(): void {
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
    this.questionAnswerService.setPointsForQuestion(3)
    this.randomFamiliadaQuestion = this.questionDataService.getFamiliadaQuestion()
    this.setAnswers()
    this.timerService.setTimer(0.5)
    this.timerService.timeout = false
  }

  close(): void {
    this.winner = null
    this.userAnswer = ''
    this.answers = []
    this.blockedButton = false
    this.playerService.nextPlayer()
    this.questionTypeService.setActiveCategory(-1)
    this.timerService.timeout = false
    this.subscription.unsubscribe()
  }

  showAnswer(): void {
    if (this.answers.length > 0) {
      this.answers.forEach((answer) => {
        answer.display = true
      })
    }
    this.isVisible = true
    this.blockedButton = true
  }

  setAnswers(): void {
    this.question = this.randomFamiliadaQuestion.question
    if (this.randomFamiliadaQuestion.answer1 != '-') {
      this.answers.push({
        id: 1,
        answer: this.randomFamiliadaQuestion.answer1.toLowerCase(),
        display: false,
      })
    }
    if (this.randomFamiliadaQuestion.answer2 != '-') {
      this.answers.push({
        id: 2,
        answer: this.randomFamiliadaQuestion.answer2.toLowerCase(),
        display: false,
      })
    }
    if (this.randomFamiliadaQuestion.answer3 != '-') {
      this.answers.push({
        id: 3,
        answer: this.randomFamiliadaQuestion.answer3.toLowerCase(),
        display: false,
      })
    }
    if (this.randomFamiliadaQuestion.answer4 != '-') {
      this.answers.push({
        id: 4,
        answer: this.randomFamiliadaQuestion.answer4.toLowerCase(),
        display: false,
      })
    }
    if (this.randomFamiliadaQuestion.answer5 != '-') {
      this.answers.push({
        id: 5,
        answer: this.randomFamiliadaQuestion.answer5.toLowerCase(),
        display: false,
      })
    }
    if (this.randomFamiliadaQuestion.answer6 != '-') {
      this.answers.push({
        id: 6,
        answer: this.randomFamiliadaQuestion.answer6.toLowerCase(),
        display: false,
      })
    }
  }

  setWrong(): void {
    const audio = new Audio('../../assets/mp3/wrong.mp3')
    audio.play()
    audio.playbackRate = 1.2
    this.actualPlayer.wrong++
  }

  save(): void {
    const input = document.getElementById('userAnswer') as HTMLInputElement
    const value = input.value.toString()
    if (input) {
      const tmp = this.answers.findIndex((el) => formatStrings(el.answer) === formatStrings(value))
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

  nextPlayer(): void {
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

  setWinner(): void {
    this.subscription.unsubscribe()
    this.timerService.resetTimeout()
    this.winner = this.players[0]
    this.blockedButton = true
    this.isVisible = true
    this.showAnswer()
    this.questionAnswerService.setWinner(this.winner.id)
  }
}
