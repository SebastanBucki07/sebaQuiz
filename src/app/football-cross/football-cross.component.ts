import { Component, OnInit } from '@angular/core'
import crests from '../../assets/football/clubCrests.json'
import { randomFromArray } from '../../common/randomize.helper'
import { PlayersService } from '../players.service'
import { QuestionDataService } from '../question-data.service'
import { Player, PlayerForFamiliada } from '../players/players.component'
import { QuestionTypesService } from '../question-types.service'
import { QuestionAndAnswerService } from '../question-and-answer.service'

export interface CrossAnswer {
  row: string[]
  column: string[]
  R0C0: string[]
  R0C1: string[]
  R0C2: string[]
  R1C0: string[]
  R1C1: string[]
  R1C2: string[]
  R2C0: string[]
  R2C1: string[]
  R2C2: string[]
}

@Component({
  selector: 'app-football-cross',
  templateUrl: './football-cross.component.html',
  styleUrls: ['./football-cross.component.css'],
})
export class FootballCrossComponent implements OnInit {
  protected randomTeams = this.questionDataService.getFootballerQuestion()
  protected crests = crests
  protected columnCrestsForQuestion: string[] = []
  protected rowCrestsForQuestion: string[] = []
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
  public doesNotExist: string[] = []

  constructor(
    protected playerService: PlayersService,
    private questionDataService: QuestionDataService,
    private questionTypeService: QuestionTypesService,
    private questionAnswerService: QuestionAndAnswerService
  ) {}

  ngOnInit(): void {
    for (let i = 0; i < 500; i++) {
      this.randomTeams = this.questionDataService.getFootballerQuestion()
      console.log(`randomTeams2: ${JSON.stringify(this.randomTeams)}`)
      //this.countClubPairs()
      //this.countPairs()
      this.init()
    }
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
    const tmp = this.playerService.getPlayers().find((el) => el.name === winner)
    return tmp
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
      const playerIndex = this.players.findIndex((el) => el.name === this.actualChar)
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
    this.randomTeams?.column.forEach((team: string) => {
      const found = this.crests.find((club) => club.team === team)
      if (found) {
        this.columnCrestsForQuestion.push(found.crest)
      } else {
        this.doesNotExist.push(team)
      }
    })
    this.randomTeams?.row.forEach((team: string) => {
      const found = this.crests.find((club) => club.team === team)
      if (found) {
        this.rowCrestsForQuestion.push(found.crest)
      } else {
        this.doesNotExist.push(team)
      }
    })
    //remove already used clubs
    this.doesNotExist = this.doesNotExist.filter((value, index) => this.doesNotExist.indexOf(value) === index)
    this.doesNotExist = this.doesNotExist.sort()
    console.log(`not found: ${JSON.stringify(this.doesNotExist)}`)
  }

  setPlayersForCross(): void {
    if (this.players.length >= 1) {
      this.players = []
    }
    const tmp = this.playerService.getPlayers()
    const player = tmp.find((el) => el.id === this.playerService.actualPlayer)
    if (player) {
      this.players.push({
        id: player.id,
        name: player.name,
        wrong: 0,
      })
    }
    let randomPlayer = randomFromArray(tmp)
    do {
      randomPlayer = randomFromArray(tmp)
    } while (randomPlayer.id === this.players[0].id)
    this.players.push({
      id: randomPlayer.id,
      name: randomPlayer.name,
      wrong: 0,
    })

    this.actualChar = this.players[0].name
  }

  /*countClubPairs() {
    console.log('this countClubPairs')
    this.clubsCross.forEach((cross) => {
      const found1 = this.clubsData.find((club) => club.team === cross.team1)
      const found2 = this.clubsData.find((club) => club.team === cross.team2)
      if (found1 !== undefined && found2 !== undefined) {
        this.alllData.forEach((player) => {
          if (player.kluby.includes(found1.team) && player.kluby.includes(found2.team)) {
            cross.count++
            cross.players.push(player.zawodnik)
          }
        })
      }
    })
    //console.dir(this.clubsCross)
  }*/

  /*countPairs() {
    console.log('this countPairs')
    this.clubsCross.forEach((clubCross) => {
      if (clubCross.count > 0) {
        const found1 = this.teamsInfo.find((club) => club.team === clubCross.team1)
        const found2 = this.teamsInfo.find((club) => club.team === clubCross.team2)
        if (found1) {
          // console.log(`======== add count to ${found1.team} actualCount: ${found1.count} =============`)
          found1.count = found1.count + 1
        }
        if (found2) {
          /!*console.log(`======== add count to ${found2.team} actualCount: ${found2.count} =============`)*!/
          found2.count = found2.count + 1
        }
      }
    })
    console.log(`teamsInfo: ${JSON.stringify(this.teamsInfo)}`)
  }*/

  close(): void {
    this.questionTypeService.setActiveCategory(-1)
    this.winner = null
    this.players = []
    this.playerService.nextPlayer()
  }
}
