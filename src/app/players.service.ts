import { Injectable } from '@angular/core'
import { Player } from './players/players.component'

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  public players: Player[] = []
  public actualPlayer = 0
  public chosen: boolean
  public isModalVisible = false

  constructor() {
    this.chosen = true
  }

  setPlayers(players: Player[]): void {
    this.players = players
  }

  setModal(modal: boolean): void {
    this.isModalVisible = modal
  }

  setActualPlayer(playerId: number): void {
    this.actualPlayer = playerId
  }

  getPlayers(): Player[] {
    return this.players
  }

  acceptPlayers(): void {
    this.chosen = false
  }

  addPoints(id: number, points: number): void {
    this.players[id].points += points
  }

  nextPlayer(): void {
    if (this.actualPlayer >= this.players.length - 1) {
      this.setActualPlayer(0)
    } else {
      this.setActualPlayer(this.actualPlayer + 1)
    }
  }
}
