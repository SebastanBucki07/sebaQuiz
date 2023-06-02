import { Component, OnInit } from '@angular/core'
import footballCrossData from '../../assets/football/footballerClubData.json'
import footballClubs from '../../assets/football/footballClub.json'
import crests from '../../assets/football/clubCrests.json'
import { randomFromArray } from '../../common/randomize.helper'
import { QuestionDataService } from '../question-data.service'
import { PlayersService } from '../players.service'
import { PlayerForFamiliada } from '../players/players.component'

export interface ClubCross {
  team1: string
  team2: string
  count: number
  players: string[]
}

@Component({
  selector: 'app-football-cross',
  templateUrl: './football-cross.component.html',
  styleUrls: ['./football-cross.component.css'],
})
export class FootballCrossComponent implements OnInit {
  public alllData = footballCrossData
  public clubsData = footballClubs
  public clubsCross: ClubCross[] = []
  public randomTeams: string[] = []
  public teamsInfo = [...this.clubsData]
  public cests = crests
  public crestsForQuestion: string[] = []
  public players: PlayerForFamiliada[] = []
  public actualChar = ''
  public end = false
  public winner: any = {}
  public board = [
    ['0', '1', '2'],
    ['0', '1', '2'],
    ['0', '1', '2'],
  ]

  constructor(public playerService: PlayersService) {}

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.setClubs()
    this.countClubPairs()
    this.countPairs()
    this.randomFromClubs()
    this.setCrests()
    this.setPlayersForCross()
    this.initBoard()
    this.playerService.setModal(true)
  }

  changeChar(playerId: number): void {
    this.actualChar = this.players[playerId].name
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

  foundWinner(winner: string) {
    return this.playerService.getPlayers().find((el) => el.name === winner)
  }

  validBoard() {
    //horizontally
    if (this.board[0][0] === this.board[0][1] && this.board[0][0] === this.board[0][2]) {
      this.winner = this.foundWinner(this.board[0][0])
      this.end = true
    } else if (this.board[1][0] === this.board[1][1] && this.board[1][0] === this.board[1][2]) {
      this.winner = this.foundWinner(this.board[1][0])
      this.end = true
    } else if (this.board[2][0] === this.board[2][1] && this.board[2][0] === this.board[2][2]) {
      this.winner = this.foundWinner(this.board[2][0])
      this.end = true
    }
    //perpendicularly
    else if (this.board[0][0] === this.board[1][0] && this.board[0][0] === this.board[2][0]) {
      this.winner = this.foundWinner(this.board[0][0])
      this.end = true
    } else if (this.board[0][1] === this.board[1][1] && this.board[0][1] === this.board[2][1]) {
      this.winner = this.foundWinner(this.board[0][1])
      this.end = true
    } else if (this.board[0][2] === this.board[1][2] && this.board[0][2] === this.board[2][2]) {
      this.winner = this.foundWinner(this.board[0][2])
      this.end = true
    }

    //diagonally
    else if (this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2]) {
      this.winner = this.foundWinner(this.board[0][0])
      this.end = true
    } else if (this.board[0][2] === this.board[1][1] && this.board[0][2] === this.board[2][0]) {
      this.winner = this.foundWinner(this.board[0][2])
      this.end = true
    } else {
      this.winner = ''
      this.end = false
    }
  }

  setCharInBoard(x: number, y: number): void {
    this.board[x][y] = this.actualChar
    this.validBoard()
    const playerIndex = this.players.findIndex((el) => el.name === this.actualChar)
    if (playerIndex === 0) {
      this.changeChar(1)
    } else {
      this.changeChar(0)
    }
  }

  initBoard() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.board[i][j] = `${i} ${j}`
      }
    }
  }

  setClubs(): void {
    this.clubsData.forEach((club) => {
      let i = club.id
      do {
        if (club.team !== this.clubsData[i - 1].team) {
          this.clubsCross.push({
            team1: club.team,
            team2: this.clubsData[i - 1].team,
            count: 0,
            players: [],
          })
        }
        i++
      } while (i <= this.clubsData.length)
    })
    //console.dir(this.clubsCross)
  }

  setCrests() {
    this.randomTeams.forEach((team) => {
      const found = this.cests.find((club) => club.team === team)
      if (found) {
        this.crestsForQuestion.push(found.crest)
      }
    })
  }

  countClubPairs() {
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
  }

  countPairs() {
    this.clubsCross.forEach((clubCross) => {
      if (clubCross.count > 0) {
        const found1 = this.teamsInfo.find((club) => club.team === clubCross.team1)
        const found2 = this.teamsInfo.find((club) => club.team === clubCross.team2)
        if (found1) {
          // console.log(`======== add count to ${found1.team} actualCount: ${found1.count} =============`)
          found1.count = found1.count + 1
        }
        if (found2) {
          /*console.log(`======== add count to ${found2.team} actualCount: ${found2.count} =============`)*/
          found2.count = found2.count + 1
        }
      }
    })
    console.log(`teamsInfo: ${JSON.stringify(this.teamsInfo)}`)
  }

  findCommonClubs() {
    let arr: string[] = []
    let arr2: string[] = []
    let arr3: string[] = []
    const clubsForRandom1 = this.clubsCross.flatMap((element) =>
      element.team1 === this.randomTeams[0] ? element.team2 : ''
    )
    const clubsForRandom2 = this.clubsCross.flatMap((element) =>
      element.team1 === this.randomTeams[1] ? element.team2 : ''
    )
    const clubsForRandom3 = this.clubsCross.flatMap((element) =>
      element.team1 === this.randomTeams[2] ? element.team2 : ''
    )
    const clubsForRandom11 = this.clubsCross.flatMap((element) =>
      element.team2 === this.randomTeams[0] ? element.team1 : ''
    )
    const clubsForRandom22 = this.clubsCross.flatMap((element) =>
      element.team2 === this.randomTeams[1] ? element.team1 : ''
    )
    const clubsForRandom33 = this.clubsCross.flatMap((element) =>
      element.team2 === this.randomTeams[2] ? element.team1 : ''
    )

    if (clubsForRandom1) {
      arr = arr.concat(clubsForRandom1)
    }
    if (clubsForRandom11) {
      arr = arr.concat(clubsForRandom11)
    }
    if (clubsForRandom2) {
      arr2 = arr2.concat(clubsForRandom2)
    }
    if (clubsForRandom22) {
      arr2 = arr2.concat(clubsForRandom22)
    }
    if (clubsForRandom3) {
      arr3 = arr3.concat(clubsForRandom3)
    }
    if (clubsForRandom33) {
      arr3 = arr3.concat(clubsForRandom33)
    }
    arr = arr.filter((e) => String(e).trim())
    arr2 = arr2.filter((e) => String(e).trim())
    arr3 = arr3.filter((e) => String(e).trim())
    const intersactionArr1Arr2 = arr.filter((x) => arr2.includes(x))
    const intersactionArr1Arr2Arr3 = intersactionArr1Arr2.filter((x) => arr3.includes(x))
    return intersactionArr1Arr2Arr3
  }

  randomFromClubs() {
    this.randomTeams = []
    const tmp3 = this.teamsInfo.filter((element) => element.count > 3)
    if (tmp3.length > 9) {
      do {
        const tmp = randomFromArray(tmp3).team
        console.log(`random team: ${tmp}`)
        if (!this.randomTeams.includes(tmp)) {
          this.randomTeams.push(tmp)
        }
      } while (this.randomTeams.length < 3)
      const clubs = this.findCommonClubs()
      console.log(`result============ ${JSON.stringify(clubs)} ==========`)
      if (clubs.length > 3) {
        do {
          const a = randomFromArray(clubs)
          if (!this.randomTeams.includes(a)) {
            this.randomTeams.push(a)
          }
        } while (this.randomTeams.length < 6)
        for (let i = 0; i < 3; i++) {
          this.randomTeams.push()
        }
      }
      this.randomTeams.forEach((team) => {
        const found2 = this.teamsInfo.find((club) => club.team === team)
        if (found2) {
          found2.count = found2.count - 3
        }
      })
      console.log(`Random teams===== ${JSON.stringify(this.randomTeams)}==========`)
    } else {
      console.log(`No teams left`)
    }
  }

  close(): void {
    this.winner = null
    this.players = []
    this.playerService.nextPlayer()
    this.init()
    this.playerService.setModal(false)
  }
}
