import { Component, OnInit } from '@angular/core'
import photo from '../../assets/photos/famousPeople.json'
import { randomFromArray } from '../../common/randomize.helper'
import { PlayersService } from '../players.service'
import { QuestionDataService } from '../question-data.service'
import { Player, PlayerForFamiliada } from '../players/players.component'
import { QuestionTypesService } from '../question-types.service'
import { QuestionAndAnswerService } from '../question-and-answer.service'
import { PhotoModel } from '../model/photo-model'

@Component({
  selector: 'app-movie-cross',
  templateUrl: './movie-cross.component.html',
  styleUrls: ['./movie-cross.component.css'],
})
export class MovieCrossComponent implements OnInit {
  protected randomTeams = this.questionDataService.getActorsQuestion()
  protected photos = photo
  protected columnCrestsForQuestion: PhotoModel[] = []
  protected rowCrestsForQuestion: PhotoModel[] = []
  protected players: PlayerForFamiliada[] = []
  protected actualChar = ''
  protected end = false
  protected winner: any = {}
  protected winnerExist = false
  protected board = [
    ['0', '1', '2'],
    ['0', '1', '2'],
    ['0', '1', '2'],
  ]

  constructor(
    protected playerService: PlayersService,
    private questionDataService: QuestionDataService,
    private questionTypeService: QuestionTypesService,
    private questionAnswerService: QuestionAndAnswerService
  ) {}

  ngOnInit(): void {
    this.randomTeams = this.questionDataService.getActorsQuestion()
    //this.countClubPairs()
    //this.countPairs()
    this.init()
  }

  init(): void {
    this.setCrests()
    this.setPlayersForCross()
    this.initBoard()
    this.questionAnswerService.setPointsForQuestion(5)
  }

  changeChar(playerId: number): void {
    this.actualChar = this.players[playerId].name
  }

  foundWinner(winner: string): Player | undefined {
    const foundWinner = this.playerService.getPlayers().find((player) => player.name === winner)
    return foundWinner
  }

  changeEnd(bool: boolean): void {
    this.end = bool
  }

  validBoard(): void {
    //horizontally
    if (
      this.board[0][0] === this.board[0][1] &&
      this.board[0][0] === this.board[0][2] &&
      this.board[0][0] !== 'blocked'
    ) {
      this.winner = this.foundWinner(this.board[0][0])
      this.setCharInBoard(0, 0, 'blocked')
      this.setCharInBoard(0, 1, 'blocked')
      this.setCharInBoard(0, 2, 'blocked')
      this.winnerExist = true
      this.changeEnd(true)
    } else if (
      this.board[1][0] === this.board[1][1] &&
      this.board[1][0] === this.board[1][2] &&
      this.board[1][0] !== 'blocked'
    ) {
      this.winner = this.foundWinner(this.board[1][0])
      this.setCharInBoard(1, 0, 'blocked')
      this.setCharInBoard(1, 1, 'blocked')
      this.setCharInBoard(1, 2, 'blocked')
      this.winnerExist = true
      this.changeEnd(true)
    } else if (
      this.board[2][0] === this.board[2][1] &&
      this.board[2][0] === this.board[2][2] &&
      this.board[2][2] !== 'blocked'
    ) {
      this.winner = this.foundWinner(this.board[2][0])
      this.setCharInBoard(2, 0, 'blocked')
      this.setCharInBoard(2, 1, 'blocked')
      this.setCharInBoard(2, 2, 'blocked')
      this.winnerExist = true
      this.changeEnd(true)
    }
    //perpendicularly
    else if (
      this.board[0][0] === this.board[1][0] &&
      this.board[0][0] === this.board[2][0] &&
      this.board[2][0] !== 'blocked'
    ) {
      this.winner = this.foundWinner(this.board[0][0])
      this.setCharInBoard(0, 0, 'blocked')
      this.setCharInBoard(1, 0, 'blocked')
      this.setCharInBoard(2, 0, 'blocked')
      this.winnerExist = true
      this.changeEnd(true)
    } else if (
      this.board[0][1] === this.board[1][1] &&
      this.board[0][1] === this.board[2][1] &&
      this.board[2][1] !== 'blocked'
    ) {
      this.winner = this.foundWinner(this.board[0][1])
      this.setCharInBoard(0, 1, 'blocked')
      this.setCharInBoard(1, 1, 'blocked')
      this.setCharInBoard(2, 1, 'blocked')
      this.winnerExist = true
      this.changeEnd(true)
    } else if (
      this.board[0][2] === this.board[1][2] &&
      this.board[0][2] === this.board[2][2] &&
      this.board[2][2] !== 'blocked'
    ) {
      this.winner = this.foundWinner(this.board[0][2])
      this.setCharInBoard(0, 2, 'blocked')
      this.setCharInBoard(1, 2, 'blocked')
      this.setCharInBoard(2, 2, 'blocked')
      this.winnerExist = true
      this.changeEnd(true)
    }

    //diagonally
    else if (
      this.board[0][0] === this.board[1][1] &&
      this.board[0][0] === this.board[2][2] &&
      this.board[2][2] != 'blocked'
    ) {
      this.winner = this.foundWinner(this.board[0][0])
      this.setCharInBoard(0, 0, 'blocked')
      this.setCharInBoard(1, 1, 'blocked')
      this.setCharInBoard(2, 2, 'blocked')
      this.winnerExist = true
      this.changeEnd(true)
    } else if (
      this.board[0][2] === this.board[1][1] &&
      this.board[0][2] === this.board[2][0] &&
      this.board[2][0] !== 'blocked'
    ) {
      this.winner = this.foundWinner(this.board[0][2])
      this.setCharInBoard(0, 2, 'blocked')
      this.setCharInBoard(1, 1, 'blocked')
      this.setCharInBoard(2, 0, 'blocked')
      this.winnerExist = true
      this.changeEnd(true)
    } else {
      this.winner = ''
      this.winnerExist = false
      this.changeEnd(false)
    }
    this.questionAnswerService.setWinner(this.winner.id)
  }

  setCharInBoard(x: number, y: number, name?: string): void {
    if (name) {
      this.board[x][y] = name
    } else if (this.board[x][y] !== 'blocked') {
      this.board[x][y] = this.actualChar
      this.validBoard()
      const playerIndex = this.players.findIndex((player) => player.name === this.actualChar)
      if (playerIndex === 0) {
        this.changeChar(1)
      } else {
        this.changeChar(0)
      }
    }
  }

  initBoard(): void {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.board[i][j] = `${i} ${j}`
      }
    }
  }

  setCrests(): void {
    this.randomTeams?.column.forEach((actress: string) => {
      const found = this.photos.find((actor) => actor.name === actress)
      if (found) {
        this.columnCrestsForQuestion.push(found)
      } else {
        this.columnCrestsForQuestion.push({
          id: 901,
          name: actress,
          photo: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        })
      }
    })
    this.randomTeams?.row.forEach((actress: string) => {
      const found = this.photos.find((actor) => actor.name === actress)
      if (found) {
        this.rowCrestsForQuestion.push(found)
      } else {
        this.rowCrestsForQuestion.push({
          id: 901,
          name: actress,
          photo: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        })
      }
    })
  }

  setPlayersForCross(): void {
    if (this.players.length >= 1) {
      this.players = []
    }
    const allPlayers = this.playerService.getPlayers()
    const player = allPlayers.find((player) => player.id === this.playerService.actualPlayer)
    if (player) {
      this.players.push({
        id: player.id,
        name: player.name,
        wrong: 0,
      })
    }
    let randomPlayer = randomFromArray(allPlayers)
    do {
      randomPlayer = randomFromArray(allPlayers)
    } while (randomPlayer.id === this.players[0].id)
    this.players.push({
      id: randomPlayer.id,
      name: randomPlayer.name,
      wrong: 0,
    })

    this.actualChar = this.players[0].name
  }

  close(): void {
    this.questionTypeService.setActiveCategory(-1)
    this.winner = null
    this.players = []
    this.playerService.nextPlayer()
  }
}
