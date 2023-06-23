import { Component, OnInit } from '@angular/core'
import { PlayersService } from '../players.service'
import { Subscription } from 'rxjs'

export interface Player {
  id: number
  name: string
  points: number
  tmpPoints: number
}

export interface PlayerForFamiliada {
  id: number
  name: string
  wrong: number
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent implements OnInit {
  protected players: Player[]
  protected name: string
  protected addTeamsButtonDisabled = true
  protected addTeamButtonDisabled = true
  protected actualPlayer = 0

  protected playersAdded = false
  protected isPlayersTableVisible = false
  private subscription: Subscription | any

  constructor(protected playerService: PlayersService) {
    this.players = []
    this.name = ''
  }

  ngOnInit(): void {
    console.log(`init playersComponent`)
    this.getActualPlayer()
  }

  getActualPlayer(): void {
    this.subscription = this.playerService.getActualPlayer().subscribe((x) => {
      this.actualPlayer = x
    })
  }

  addTeam(name: string): void {
    const playerLength = this.players.length
    const player: Player = {
      id: playerLength,
      name: name,
      points: 0,
      tmpPoints: 0,
    }
    this.name = ''
    this.players.push(player)
    this.sendPlayers(this.players)
    this.addTeamButtonDisabled = true
    if (this.players.length > 1) {
      this.addTeamsButtonDisabled = false
    }
    this.isPlayersTableVisible = true
  }

  save(event: any): void {
    this.name = event.target.value.toLowerCase()
    this.name.length >= 4 ? (this.addTeamButtonDisabled = false) : (this.addTeamButtonDisabled = true)
  }

  hideInput(): void {
    this.isPlayersTableVisible = true
    this.playersAdded = true
  }

  sendPlayers(players: Player[]): void {
    this.playerService.setPlayers(players)
  }
}
