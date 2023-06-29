import { Component, OnInit } from '@angular/core'
import footballCrossData from '../../assets/football/footballerClubData.json'
import footballClubs from '../../assets/football/footballClub.json'
import crests from '../../assets/football/clubCrests.json'
import { randomFromArray } from '../../common/randomize.helper'
import { PlayersService } from '../players.service'
import { QuestionDataService } from '../question-data.service'
import { Player, PlayerForFamiliada } from '../players/players.component'
import { QuestionTypesService } from '../question-types.service'
import { QuestionAndAnswerService } from '../question-and-answer.service'

export interface ClubCross {
  team1: string
  team2: string
  count: number
  players: string[]
}

export interface Dict {
  [key: string]: {
    count: number
  }
}

@Component({
  selector: 'app-football-cross',
  templateUrl: './football-cross.component.html',
  styleUrls: ['./football-cross.component.css'],
})
export class FootballCrossComponent implements OnInit {
  protected allData = footballCrossData
  protected clubsData = footballClubs
  protected clubsCross: ClubCross[] = []
  protected randomTeams: string[] = []
  private alllData = footballCrossData
  private clubsData = footballClubs
  private clubsCross: ClubCross[] = []
  private randomTeams: string[] = []
  //public teamsInfo = [...this.clubsData]
  protected crests = crests
  protected crestsForQuestion: string[] = []
  protected players: PlayerForFamiliada[] = []
  protected actualChar = ''
  protected end = false
  protected winner: any = {}
  protected board = [
  private cests = crests
  private lib: Dict = {}

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
  protected abc: Dict = {}

  constructor(
    protected playerService: PlayersService,
    private questionDataService: QuestionDataService,
    private questionTypeService: QuestionTypesService,
    private questionAnswerService: QuestionAndAnswerService
  ) {}
  constructor(public playerService: PlayersService, private questionDataService: QuestionDataService) {}

  ngOnInit(): void {
    const reuslt = this.questionDataService.getFootballerQuestion()
    console.log(reuslt)
    this.setClubs()
    this.countClubPairs()
    //this.countPairs()
    this.createLib()
    this.init()
  }

  init(): void {
    this.randomFromClubs()
    this.setCrests()
    this.setPlayersForCross()
    this.initBoard()
    this.questionAnswerService.setPointsForQuestion(5)
  init() {
    // this.randomFromClubs()
    // this.setCrests()
    // this.setPlayersForCross()
    // this.initBoard()
    this.playerService.setModal(true)
  }

  changeChar(playerId: number): void {
    this.actualChar = this.players[playerId].name
  }

  createLib(): void {
    console.log('createLib()')
    this.allData.forEach((player) => {
      console.log(JSON.stringify(player))
      if (player.kluby) {
        player.kluby.forEach((klub) => {
          for (let i = player.kluby.indexOf(klub); i < player.kluby.length - 1; i++) {
            const sorted = [`${klub}`, `${player.kluby[i + 1]}`].sort((a, b) => a.localeCompare(b))
            const tmp = `${sorted[0]}_${sorted[1]}`
            if (this.abc[tmp]) {
              this.abc[tmp].count++
            } else {
              this.abc[tmp] = {
                count: 1,
              }
            }
          }
        })
      }
    })
    console.log(`lib: ${JSON.stringify(this.abc)}`)
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

  foundWinner(winner: string): Player | undefined {
    return this.playerService.getPlayers().find((el) => el.name === winner)
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
      this.changeEnd(true)
    } else {
      this.winner = ''
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

  setClubs(): void {
    console.log('this set club')
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
    console.dir(this.clubsCross)
  }

  setCrests(): void {
    this.crestsForQuestion = []
    this.randomTeams.forEach((team) => {
      const found = this.crests.find((club) => club.team === team)
      if (found) {
        this.crestsForQuestion.push(found.crest)
      }
    })
  }

  countClubPairs(): void {
    console.log('this countClubPairs')
    this.clubsCross.forEach((cross) => {
      const found1 = this.clubsData.find((club) => club.team === cross.team1)
      const found2 = this.clubsData.find((club) => club.team === cross.team2)
      if (found1 !== undefined && found2 !== undefined) {
        this.allData.forEach((player) => {
          if (player.kluby.includes(found1.team) && player.kluby.includes(found2.team)) {
            cross.count++
            cross.players.push(player.zawodnik)
          }
        })
      }
    })
    //console.dir(this.clubsCross)
  }
  // createLib() {
  //   console.log('createLib()')
  //   this.alllData.forEach((player) => {
  //     console.log(JSON.stringify(player))
  //     if (player.kluby) {
  //       player.kluby.forEach((klub) => {
  //         for (let i = player.kluby.indexOf(klub); i < player.kluby.length - 1; i++) {
  //           const sorted = [`${klub}`, `${player.kluby[i + 1]}`].sort((a, b) => a.localeCompare(b))
  //           const tmp = `${sorted[0]}_${sorted[1]}`
  //           if (this.lib[tmp]) {
  //             this.lib[tmp].count++
  //           } else {
  //             this.lib[tmp] = {
  //               count: 1,
  //             }
  //           }
  //         }
  //       })
  //     }
  //   })
  //   console.log(`lib: ${JSON.stringify(this.lib)}`)
  // }
  //
  // setPlayersForCross(): void {
  //   if (this.players.length >= 1) {
  //     this.players = []
  //   }
  //   const tmp = this.playerService.getPlayers()
  //   const player = tmp.find((el) => el.id === this.playerService.actualPlayer)
  //   if (player) {
  //     this.players.push({
  //       id: player.id,
  //       name: player.name,
  //       wrong: 0,
  //     })
  //   }
  //   let randomPlayer = randomFromArray(tmp)
  //   do {
  //     randomPlayer = randomFromArray(tmp)
  //   } while (randomPlayer.id === this.players[0].id)
  //   this.players.push({
  //     id: randomPlayer.id,
  //     name: randomPlayer.name,
  //     wrong: 0,
  //   })
  //
  //   this.actualChar = this.players[0].name
  // }
  //
  // foundWinner(winner: string) {
  //   return this.playerService.getPlayers().find((el) => el.name === winner)
  // }
  //
  // changeEnd(bool: boolean) {
  //   this.end = bool
  // }
  //
  // validBoard() {
  //   //horizontally
  //   if (
  //     this.board[0][0] === this.board[0][1] &&
  //     this.board[0][0] === this.board[0][2] &&
  //     this.board[0][0] !== 'blocked'
  //   ) {
  //     this.winner = this.foundWinner(this.board[0][0])
  //     this.setCharInBoard(0, 0, 'blocked')
  //     this.setCharInBoard(0, 1, 'blocked')
  //     this.setCharInBoard(0, 2, 'blocked')
  //     this.changeEnd(true)
  //   } else if (
  //     this.board[1][0] === this.board[1][1] &&
  //     this.board[1][0] === this.board[1][2] &&
  //     this.board[1][0] !== 'blocked'
  //   ) {
  //     this.winner = this.foundWinner(this.board[1][0])
  //     this.setCharInBoard(1, 0, 'blocked')
  //     this.setCharInBoard(1, 1, 'blocked')
  //     this.setCharInBoard(1, 2, 'blocked')
  //     this.changeEnd(true)
  //   } else if (
  //     this.board[2][0] === this.board[2][1] &&
  //     this.board[2][0] === this.board[2][2] &&
  //     this.board[2][2] !== 'blocked'
  //   ) {
  //     this.winner = this.foundWinner(this.board[2][0])
  //     this.setCharInBoard(2, 0, 'blocked')
  //     this.setCharInBoard(2, 1, 'blocked')
  //     this.setCharInBoard(2, 2, 'blocked')
  //     this.changeEnd(true)
  //   }
  //   //perpendicularly
  //   else if (
  //     this.board[0][0] === this.board[1][0] &&
  //     this.board[0][0] === this.board[2][0] &&
  //     this.board[2][0] !== 'blocked'
  //   ) {
  //     this.winner = this.foundWinner(this.board[0][0])
  //     this.setCharInBoard(0, 0, 'blocked')
  //     this.setCharInBoard(1, 0, 'blocked')
  //     this.setCharInBoard(2, 0, 'blocked')
  //     this.changeEnd(true)
  //   } else if (
  //     this.board[0][1] === this.board[1][1] &&
  //     this.board[0][1] === this.board[2][1] &&
  //     this.board[2][1] !== 'blocked'
  //   ) {
  //     this.winner = this.foundWinner(this.board[0][1])
  //     this.setCharInBoard(0, 1, 'blocked')
  //     this.setCharInBoard(1, 1, 'blocked')
  //     this.setCharInBoard(2, 1, 'blocked')
  //     this.changeEnd(true)
  //   } else if (
  //     this.board[0][2] === this.board[1][2] &&
  //     this.board[0][2] === this.board[2][2] &&
  //     this.board[2][2] !== 'blocked'
  //   ) {
  //     this.winner = this.foundWinner(this.board[0][2])
  //     this.setCharInBoard(0, 2, 'blocked')
  //     this.setCharInBoard(1, 2, 'blocked')
  //     this.setCharInBoard(2, 2, 'blocked')
  //     this.changeEnd(true)
  //   }
  //
  //   //diagonally
  //   else if (
  //     this.board[0][0] === this.board[1][1] &&
  //     this.board[0][0] === this.board[2][2] &&
  //     this.board[2][2] != 'blocked'
  //   ) {
  //     this.winner = this.foundWinner(this.board[0][0])
  //     this.setCharInBoard(0, 0, 'blocked')
  //     this.setCharInBoard(1, 1, 'blocked')
  //     this.setCharInBoard(2, 2, 'blocked')
  //     this.changeEnd(true)
  //   } else if (
  //     this.board[0][2] === this.board[1][1] &&
  //     this.board[0][2] === this.board[2][0] &&
  //     this.board[2][0] !== 'blocked'
  //   ) {
  //     this.winner = this.foundWinner(this.board[0][2])
  //     this.setCharInBoard(0, 2, 'blocked')
  //     this.setCharInBoard(1, 1, 'blocked')
  //     this.setCharInBoard(2, 0, 'blocked')
  //     this.changeEnd(true)
  //   } else {
  //     this.winner = ''
  //     this.changeEnd(false)
  //   }
  // }
  //
  // setCharInBoard(x: number, y: number, name?: string): void {
  //   if (name) {
  //     this.board[x][y] = name
  //   } else if (this.board[x][y] !== 'blocked') {
  //     this.board[x][y] = this.actualChar
  //     this.validBoard()
  //     const playerIndex = this.players.findIndex((el) => el.name === this.actualChar)
  //     if (playerIndex === 0) {
  //       this.changeChar(1)
  //     } else {
  //       this.changeChar(0)
  //     }
  //   }
  // }
  //
  // initBoard() {
  //   for (let i = 0; i < 3; i++) {
  //     for (let j = 0; j < 3; j++) {
  //       this.board[i][j] = `${i} ${j}`
  //     }
  //   }
  // }
  //
  // setClubs(): void {
  //   console.log('this set club')
  //   this.clubsData.forEach((club) => {
  //     let i = club.id
  //     do {
  //       if (club.team !== this.clubsData[i - 1].team) {
  //         this.clubsCross.push({
  //           team1: club.team,
  //           team2: this.clubsData[i - 1].team,
  //           count: 0,
  //           players: [],
  //         })
  //       }
  //       i++
  //     } while (i <= this.clubsData.length)
  //   })
  //   console.dir(this.clubsCross)
  // }
  //
  // setCrests() {
  //   this.crestsForQuestion = []
  //   this.randomTeams.forEach((team) => {
  //     const found = this.cests.find((club) => club.team === team)
  //     if (found) {
  //       this.crestsForQuestion.push(found.crest)
  //     }
  //   })
  // }
  //
  // countClubPairs() {
  //   console.log('this countClubPairs')
  //   this.clubsCross.forEach((cross) => {
  //     const found1 = this.clubsData.find((club) => club.team === cross.team1)
  //     const found2 = this.clubsData.find((club) => club.team === cross.team2)
  //     if (found1 !== undefined && found2 !== undefined) {
  //       this.alllData.forEach((player) => {
  //         if (player.kluby.includes(found1.team) && player.kluby.includes(found2.team)) {
  //           cross.count++
  //           cross.players.push(player.zawodnik)
  //         }
  //       })
  //     }
  //   })
  //   //console.dir(this.clubsCross)
  // }

  // countPairs() {
  //   console.log('this countPairs')
  //   this.clubsCross.forEach((clubCross) => {
  //     if (clubCross.count > 0) {
  //       const found1 = this.teamsInfo.find((club) => club.team === clubCross.team1)
  //       const found2 = this.teamsInfo.find((club) => club.team === clubCross.team2)
  //       if (found1) {
  //         // console.log(`======== add count to ${found1.team} actualCount: ${found1.count} =============`)
  //         found1.count = found1.count + 1
  //       }
  //       if (found2) {
  //         /*console.log(`======== add count to ${found2.team} actualCount: ${found2.count} =============`)*/
  //         found2.count = found2.count + 1
  //       }
  //     }
  //   })
  //   console.log(`teamsInfo: ${JSON.stringify(this.teamsInfo)}`)
  // }

  findCommonClubs() {
    let arr: string[] = []
    let arr2: string[] = []
    let arr3: string[] = []
    const gratherThan1 = this.clubsCross.filter((el) => el.count > 0)
    //console.log(`gratherThan1============ ${JSON.stringify(gratherThan1)} ==========`)
    const clubsForRandom1 = gratherThan1.flatMap((element) =>
      element.team1 === this.randomTeams[0] ? element.team2 : ''
    )
    const clubsForRandom2 = gratherThan1.flatMap((element) =>
      element.team1 === this.randomTeams[1] ? element.team2 : ''
    )
    const clubsForRandom3 = gratherThan1.flatMap((element) =>
      element.team1 === this.randomTeams[2] ? element.team2 : ''
    )
    const clubsForRandom11 = gratherThan1.flatMap((element) =>
      element.team2 === this.randomTeams[0] ? element.team1 : ''
    )
    const clubsForRandom22 = gratherThan1.flatMap((element) =>
      element.team2 === this.randomTeams[1] ? element.team1 : ''
    )
    const clubsForRandom33 = gratherThan1.flatMap((element) =>
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

    arr = arr.filter((value, index) => arr.indexOf(value) === index)
    arr2 = arr2.filter((value, index) => arr2.indexOf(value) === index)
    arr3 = arr3.filter((value, index) => arr3.indexOf(value) === index)
    arr = arr.filter((e) => String(e).trim())
    arr2 = arr2.filter((e) => String(e).trim())
    arr3 = arr3.filter((e) => String(e).trim())
    console.log(`arr============ ${JSON.stringify(arr)} ==========`)
    console.log(`arr2============ ${JSON.stringify(arr2)} ==========`)
    console.log(`arr3============ ${JSON.stringify(arr3)} ==========`)
    const intersactionArr1Arr2 = arr.filter((x) => arr2.includes(x))
    console.log(`arr1arr2============ ${JSON.stringify(intersactionArr1Arr2)} ==========`)
    const intersactionArr1Arr2Arr3 = intersactionArr1Arr2.filter((x) => arr3.includes(x))
    console.log(`arr1arr2arr3============ ${JSON.stringify(intersactionArr1Arr2Arr3)} ==========`)
    return intersactionArr1Arr2Arr3
  }

  randomFromClubs() {
    this.randomTeams = []
    //const tmp3 = this.teamsInfo.filter((element) => element.count > 3)
    if (this.clubsData.length > 9) {
      do {
        const tmp = randomFromArray(this.clubsData).team
        console.log(`random team: ${tmp}`)
        if (!this.randomTeams.includes(tmp)) {
          this.randomTeams.push(tmp)
        }
      } while (this.randomTeams.length < 3)
      const clubs = this.findCommonClubs()
      //console.log(`result============ ${JSON.stringify(clubs)} ==========`)
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
      } else {
        this.randomFromClubs()
      }
      console.log(`Random teams===== ${JSON.stringify(this.randomTeams)}==========`)
    } else {
      console.log(`No teams left`)
    }
  }

  close(): void {
    this.winner = null
    this.players = []
    this.playerService.nextPlayer()
    this.questionTypeService.setActiveCategory(-1)
  }
}
