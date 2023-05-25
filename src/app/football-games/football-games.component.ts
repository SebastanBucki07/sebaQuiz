import { Component, OnInit } from '@angular/core'
import { QuestionDataService } from '../question-data.service'
import { PlayersService } from '../players.service'
import { InputAnswerModel, FootballGamesModel } from '../model/footballgames-model'
import { PlayerForFamiliada } from '../players/players.component'
import { TimerService } from '../timer.service'
import { Subscription } from 'rxjs'
import { formatStrings } from '../../common/string.helper'

@Component({
  selector: 'app-football-games',
  templateUrl: './football-games.component.html',
  styleUrls: ['./football-games.component.css'],
  providers: [TimerService],
})
export class FootballGamesComponent implements OnInit {
  private subscription: Subscription | any
  public points = 5
  public footballGames: FootballGamesModel | any = {}
  public answerForSquad: InputAnswerModel[] = []
  public question = ''
  public tip = ''
  public userAnswer = ''
  public inputAnswer: string | undefined = ''
  public players: PlayerForFamiliada[] = []
  public actualPlayer: PlayerForFamiliada | any = null
  public blockedButton = false
  public isVisible = false
  public end = false
  public winner: PlayerForFamiliada | any = null

  constructor(
    private questionDataService: QuestionDataService,
    public playerService: PlayersService,
    public timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.getQuestion()
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

  getQuestion(): void {
    this.timerService.setTimer(0.5)
    this.subscription = this.timerService.getBooleean().subscribe((x) => {
      if (x) {
        this.setWrong()
        this.nextPlayer()
        this.timerService.timeout = false
      }
    })
    this.setPlayersForFamiliada()
    this.points = 5
    this.footballGames = this.questionDataService.getFootballGameQuestion()
    this.setAnswerForSquads()
    this.question = 'Wymień piłkarzy z meczu'
    this.tip = this.footballGames.mecz
    this.isVisible = false
  }

  setAnswerForSquads(): void {
    this.footballGames.squad.forEach((player: string) => {
      this.answerForSquad.push({
        inputAnswer: player,
        display: false,
      })
    })
  }

  close(): void {
    this.question = ''
    this.winner = null
    this.footballGames = {}
    this.answerForSquad = []
    this.blockedButton = false
    this.playerService.nextPlayer()
    this.playerService.setModal(false)
    this.timerService.timeout = false
    this.subscription.unsubscribe()
    this.getQuestion()
    this.playerService.nextPlayer()
  }

  setWinner(): void {
    this.subscription.unsubscribe()
    this.timerService.resetTimeout()
    this.winner = this.players[0]
    this.blockedButton = true
    this.isVisible = true
    this.showAnswer()
  }

  showAnswer(): void {
    if (this.answerForSquad.length > 0) {
      this.answerForSquad.forEach((answer) => {
        answer.display = true
      })
    }
    this.isVisible = true
    this.blockedButton = true
  }

  save(): void {
    const input = document.getElementById('userAnswer') as HTMLInputElement
    const value = input?.value
    if (input != null) {
      const tmp = this.answerForSquad.findIndex((el) => formatStrings(el.inputAnswer) === formatStrings(value))
      if (tmp !== -1) {
        if (!this.answerForSquad[tmp].display) {
          this.answerForSquad[tmp].display = true
          this.inputAnswer = ''
          const audio = new Audio('../../assets/mp3/1z10dobrzee.mp3')
          audio.play()
          audio.playbackRate = 1
        } else {
          this.setWrong()
        }
      } else {
        this.setWrong()
      }
      this.inputAnswer = ''
      this.nextPlayer()
    }
  }

  setWrong(): void {
    this.actualPlayer.wrong++
    const audio = new Audio('../../assets/mp3/1z10zle.mp3')
    audio.play()
    audio.playbackRate = 1.2
  }
}
